"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PackageProduct } from "@/lib/packageProducts";

/** Inline galleries stay independent of package selection and customer form state. */
export default function PackageProductGallery({ product }: { product: PackageProduct }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const image = product.images[activeIndex];
  const imageId = `product-image-${product.id}`;

  function move(delta: number) {
    setActiveIndex((current) => (current + delta + product.images.length) % product.images.length);
  }

  return (
    <div role="group" aria-roledescription="bildegalleri" aria-label={`Produktbilder: ${product.name}`} className="min-w-0"
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "Home") { event.preventDefault(); setActiveIndex(0); }
        if (event.key === "End") { event.preventDefault(); setActiveIndex(product.images.length - 1); }
      }}>
      <div id={imageId} className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-[#F5F3EF] [touch-action:pan-y_pinch-zoom]"
        onTouchStart={(event) => {
          touchStart.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
        }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          const end = event.changedTouches[0];
          if (!start || !end || event.touches.length > 0) return;
          const dx = end.clientX - start.x, dy = end.clientY - start.y;
          if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1);
        }}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1152px) calc((100vw - 80px) / 2), 536px" loading="lazy" draggable={false} className="h-full w-full object-contain" />
      </div>
      <div className="px-4 pt-4 sm:px-5">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <button type="button" onClick={() => move(-1)} aria-controls={imageId} aria-label={`Forrige bilde av ${product.name}`} className="min-h-11 min-w-11 rounded-lg border border-gray-300 px-3 text-lg hover:border-[#805B36]">←</button>
          <p className="text-center text-sm text-gray-600" aria-live="polite" aria-atomic="true">Bilde {activeIndex + 1} av {product.images.length}</p>
          <button type="button" onClick={() => move(1)} aria-controls={imageId} aria-label={`Neste bilde av ${product.name}`} className="min-h-11 min-w-11 rounded-lg border border-gray-300 px-3 text-lg hover:border-[#805B36]">→</button>
        </div>
        <div className="mt-3 grid min-h-[104px] grid-cols-4 content-start gap-2" aria-label="Miniatyrbilder">
          {product.images.map((thumbnail, index) => (
            <button key={thumbnail.src} type="button" onClick={() => setActiveIndex(index)} aria-controls={imageId} aria-pressed={activeIndex === index} aria-label={`Vis bilde ${index + 1} av ${product.name}: ${thumbnail.alt}`} className={`relative h-12 min-w-0 overflow-hidden rounded-lg border-2 transition-colors motion-reduce:transition-none ${activeIndex === index ? "border-[#805B36] ring-1 ring-[#805B36]" : "border-transparent hover:border-gray-400"}`}>
              <Image src={thumbnail.src} alt="" width={thumbnail.width} height={thumbnail.height} sizes="(max-width: 767px) calc((100vw - 104px) / 4), 120px" loading="lazy" draggable={false} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
