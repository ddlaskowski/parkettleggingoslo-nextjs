import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = new URL("../", import.meta.url);

// Exercise the actual TypeScript modules with existing TypeScript tooling.
function load(file, overrides = {}) {
  const exports = {};
  const source = ts.transpileModule(readFileSync(new URL(file, root), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const resolve = (name) => {
    if (name in overrides) return overrides[name];
    if (name === "./packageProducts") return load("lib/packageProducts.ts");
    if (name === "@/lib/siteConfig") return load("lib/siteConfig.ts");
    return require(name);
  };
  new Function("require", "exports", source)(resolve, exports);
  return exports;
}

const { calculatePackage, createPackageSummary, formatPackagePrice } = load("lib/packagePricing.ts");

test("approved package totals, VAT-inclusive rates and minimums", () => {
  for (const [id, totals] of [
    ["classic-oak", [14900, 29800, 52150, 74500]],
    ["select-larvik", [13900, 27800, 48650, 69500]],
  ]) {
    for (const [index, area] of [10, 20, 35, 50].entries()) {
      const result = calculatePackage(id, String(area));
      assert.equal(result.valid, true);
      assert.equal(result.areaM2, area);
      assert.equal(result.total, totals[index]);
    }
  }
  assert.match(formatPackagePrice(52150).replaceAll(/\s/g, " "), /52 150 kr/);
});

test("rejects invalid input without clamping, rounding or stale summaries", () => {
  for (const input of ["", "0", "9", "-10", "10.0", "10,0", ".10", "1e2", "10abc", "NaN", "Infinity", " 10", "10 ", "999999999999999999999999"]) {
    const result = calculatePackage("classic-oak", input);
    assert.equal(result.valid, false, input);
    assert.equal(createPackageSummary(result), null, input);
    assert.ok(result.error.length > 0);
  }
  assert.equal(calculatePackage("unknown-product", "35").valid, false);
  assert.equal(calculatePackage("", "35").valid, false);
});

test("summary switches product/area and identifies transport, allowance and exclusions", () => {
  const oak = createPackageSummary(calculatePackage("classic-oak", "35"));
  const larvik = createPackageSummary(calculatePackage("select-larvik", "20"));
  for (const value of ["Classic Oak", "35 m²", "materialtillegg", "innbæring", "Underlag", "Gulvlister", "25 % mva.", "Endelig tilbud"]) assert.ok(oak.includes(value), value);
  assert.match(oak.replaceAll(/\s/g, " "), /52 150 kr/);
  assert.match(larvik, /Woodura Planks Larvik 3\.0 XXL/);
  assert.match(larvik.replaceAll(/\s/g, " "), /27 800 kr/);
  assert.doesNotMatch(larvik, /Classic Oak/);
});

function nodes(tree) {
  if (!tree || typeof tree !== "object") return [];
  return [tree, ...[tree.props?.children].flat(Infinity).flatMap(nodes)];
}

function contactHarness(props = {}) {
  const state = [], requests = [], events = [];
  let cursor, dirty, tree, response = { ok: true, json: async () => ({ messageId: "mock-only" }) };
  const react = {
    useId: () => "test",
    useState(initial) {
      const index = cursor++;
      if (!(index in state)) state[index] = typeof initial === "function" ? initial() : initial;
      return [state[index], value => { state[index] = typeof value === "function" ? value(state[index]) : value; dirty = true; }];
    },
  };
  const Component = load("components/ContactForm.tsx", { react, "@/lib/track": { track: (...args) => events.push(args) } }).default;
  function render() {
    let tries = 0;
    do { cursor = 0; dirty = false; tree = Component(props); assert.ok(++tries < 5); } while (dirty);
  }
  const find = predicate => nodes(tree).find(predicate);
  const field = suffix => find(node => node.props?.id === `test-${suffix}`);
  const change = (suffix, value) => { field(suffix).props.onChange({ target: { value } }); render(); };
  const button = () => find(node => node.type === "button" && node.props.type === "submit");
  async function submit() {
    const previousFetch = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
      requests.push({ url, method: options.method, payload: JSON.parse(options.body) });
      if (response instanceof Error) throw response;
      return response;
    };
    try { await find(node => node.type === "form").props.onSubmit({ preventDefault() {} }); render(); }
    finally { globalThis.fetch = previousFetch; }
  }
  render();
  return { change, field, button, submit, requests, events, find, render,
    props(value) { props = value; render(); },
    response(value) { response = value; },
  };
}

test("package updates preserve notes and contact fields; only the existing API message carries summary", async () => {
  const summary = createPackageSummary(calculatePackage("classic-oak", "35"));
  const form = contactHarness({ packageSummary: summary });
  form.change("name", " Testkunde "); form.change("phone", "+47 1234 5678");
  form.change("place", " Oslo "); form.change("message", " Mine rom og undergulv ");
  const revised = createPackageSummary(calculatePackage("select-larvik", "20"));
  form.props({ packageSummary: revised });
  assert.equal(form.field("message").props.value, " Mine rom og undergulv ");
  assert.equal(form.field("name").props.value, " Testkunde ");
  assert.equal(form.button().props.disabled, false);
  form.props({ packageSummary: null });
  assert.equal(form.button().props.disabled, true);
  assert.equal(form.field("message").props.value, " Mine rom og undergulv ");
  form.props({ packageSummary: revised });
  await form.submit();
  assert.deepEqual(form.requests[0], { url: "/api/contact", method: "POST", payload: {
    name: "Testkunde", mobile: "+47 1234 5678", email: "",
    message: `${revised}\n\nKundens opplysninger:\nMine rom og undergulv\nOmråde: Oslo`, accept: true, honeypot: "",
  } });
  assert.deepEqual(form.events, [["contact_submit_success"]]);
  assert.equal(form.field("message").props.value, "");
});

test("invalid package/consent blocks sending; errors and retries retain user text", async () => {
  const form = contactHarness({ packageSummary: null });
  form.change("name", "Testkunde"); form.change("phone", "12345678"); form.change("message", "Rom og undergulv");
  assert.equal(form.button().props.disabled, true); await form.submit(); assert.equal(form.requests.length, 0);
  form.props({ packageSummary: "Gyldig pakkeoppsummering" });
  const consent = () => form.find(node => node.type === "input" && node.props.type === "checkbox");
  consent().props.onChange(); form.render(); assert.equal(form.button().props.disabled, true);
  consent().props.onChange(); form.render();
  for (const response of [{ ok: false, json: async () => ({ error: "Prøv igjen" }) }, { ok: true, json: async () => ({ messageId: "ignored" }) }, new Error("offline")]) {
    form.response(response); await form.submit();
    assert.equal(form.field("message").props.value, "Rom og undergulv");
    assert.ok(form.find(node => node.props?.role === "alert"));
    assert.equal(form.events.length, 0);
  }
});

test("legacy installation prefill, message payload and analytics stay compatible", async () => {
  const form = contactHarness({ prefill: { message: "Fra arbeidskalkulatoren" } });
  assert.equal(form.field("message").props.value, "Fra arbeidskalkulatoren");
  form.change("message", "Egne notater"); form.render();
  assert.equal(form.field("message").props.value, "Egne notater");
  form.props({ prefill: { message: "Nye valg fra arbeidskalkulatoren" } });
  assert.equal(form.field("message").props.value, "Nye valg fra arbeidskalkulatoren");
  form.change("name", "Testkunde"); form.change("phone", "12345678"); form.change("place", "Asker");
  await form.submit();
  assert.equal(form.requests[0].payload.message, "Nye valg fra arbeidskalkulatoren\nOmråde: Asker");
  assert.deepEqual(form.events, [["contact_submit_success"]]);
});

test("existing calculator-to-form callback retains installation details", () => {
  let prefill = "";
  const Component = load("components/HomeClient.tsx", {
    react: { useState: () => [prefill, value => { prefill = value; }], useEffect() {} },
    "@/components/PriceCalculator": { default: "PriceCalculator" },
    "@/components/ContactForm": { default: "ContactForm" },
  }).default;
  const calculator = nodes(Component({})).find(node => node.type === "PriceCalculator");
  calculator.props.onSendInquiry({ areaM2: 35, floorTypeLabel: "Parkett (limt)", patternLabel: "Fiskeben", patternExtras: ["Ramme"], addOns: ["Lister"], wasteDisposal: "Avfall", estimateTotal: 21000, estimatePerM2: 600, minimumApplied: false, includeVat: true });
  const message = nodes(Component({})).find(node => node.type === "ContactForm").props.prefill.message;
  for (const value of ["Parkett (limt)", "35 m²", "Fiskeben", "Ramme", "Lister", "Avfall", "(inkl. MVA)"]) assert.ok(message.includes(value), value);
});

test("product photography points to existing unique assets and the exact supplied manufacturer links", () => {
  const { packageProducts } = load("lib/packageProducts.ts");
  for (const [index, folder] of ["meister", "bjelin"].entries()) {
    const product = packageProducts[index];
    assert.equal(product.manufacturerUrl, readFileSync(new URL(`public/sale/${folder}/link.txt`, root), "utf8").trim());
    assert.equal(product.dimensions.thicknessMm, index === 0 ? 11 : 11.2);
    const files = product.images.map(image => readFileSync(new URL(`public${image.src}`, root)));
    assert.equal(new Set(files.map(bytes => bytes.toString("base64"))).size, files.length);
    for (const image of product.images) {
      assert.ok(image.alt.length > 20);
      assert.ok(image.width > 0 && image.height > 0);
    }
  }
});

test("gallery keyboard and thumbnail navigation wrap without changing package state", () => {
  const { packageProducts } = load("lib/packageProducts.ts");
  const slots = [];
  let cursor, tree;
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = initial;
      return [slots[index], value => { slots[index] = typeof value === "function" ? value(slots[index]) : value; }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initial };
      return slots[index];
    },
  };
  const Gallery = load("components/PackageProductGallery.tsx", { react, "next/image": { default: "Image" } }).default;
  const product = packageProducts[1];
  function render() { cursor = 0; tree = Gallery({ product }); }
  const image = () => nodes(tree).find(node => node.type === "Image");
  const main = () => nodes(tree).find(node => node.props?.id === `product-image-${product.id}`);
  function key(value, modifiers = {}) { tree.props.onKeyDown({ key: value, preventDefault() {}, ...modifiers }); render(); }
  render(); assert.equal(image().props.src, product.images[0].src);
  key("ArrowLeft"); assert.equal(image().props.src, product.images.at(-1).src);
  key("ArrowRight"); assert.equal(image().props.src, product.images[0].src);
  key("End"); assert.equal(image().props.src, product.images.at(-1).src);
  key("Home"); assert.equal(image().props.src, product.images[0].src);
  key("ArrowRight", { ctrlKey: true }); assert.equal(image().props.src, product.images[0].src);
  const thumbnails = () => nodes(tree).filter(node => node.type === "button" && node.props["aria-pressed"] !== undefined);
  thumbnails()[3].props.onClick(); render();
  assert.equal(image().props.src, product.images[3].src);
  assert.equal(thumbnails().filter(node => node.props["aria-pressed"]).length, 1);
  main().props.onTouchStart({ touches: [{ clientX: 200, clientY: 100 }] });
  main().props.onTouchEnd({ changedTouches: [{ clientX: 100, clientY: 110 }], touches: [] }); render();
  assert.equal(image().props.src, product.images[4].src);
  main().props.onTouchStart({ touches: [{ clientX: 200, clientY: 100 }] });
  main().props.onTouchEnd({ changedTouches: [{ clientX: 190, clientY: 220 }], touches: [] }); render();
  assert.equal(image().props.src, product.images[4].src, "vertical scroll must not change the image");
  main().props.onTouchStart({ touches: [{ clientX: 200, clientY: 100 }] });
  main().props.onTouchCancel();
  main().props.onTouchEnd({ changedTouches: [{ clientX: 100, clientY: 110 }], touches: [] }); render();
  assert.equal(image().props.src, product.images[4].src);
});

