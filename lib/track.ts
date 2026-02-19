// lib/track.ts
export function track(event: string, extra?: Record<string, unknown>) {
  // fire-and-forget: nie blokujemy UX
  fetch("/api/footprint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      path: typeof window !== "undefined" ? window.location.pathname : "",
      ...extra,
    }),
  }).catch(() => {});
}
