"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/work/parkettleggingoslo_${n}.jpg`,
    alt: `Parkett – referanse ${n}`,
  };
});;

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);


  const SWIPE_X = 45; // px
  const SWIPE_Y_CLOSE = 80; // px
  const SWIPE_CHANGE = 70; // px – próg zmiany zdjęcia
  const SWIPE_CLOSE = 110; // px – próg zamknięcia w dół

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
  const progress = clamp(Math.abs(dragX) / 140, 0, 1);
  const rotateClamped = clamp(dragX * 0.03, -4, 4);
  const scaleDrag = 1 - progress * 0.04; // 1 -> 0.96
  const scaleFinal = isClosing ? 0.98 : scaleDrag;

  const modalTransform = `translate3d(${dragX}px, ${dragY}px, 0) rotate(${rotateClamped}deg) scale(${scaleFinal})`;


  const open = (index: number) => {
    setIsClosing(false);
    setActiveIndex(index);
  };

  const close = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveIndex(null);
      setIsClosing(false);
    }, 200);
  };

  const next = () =>
    setActiveIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  const prev = () =>
    setActiveIndex((prev) =>
      prev !== null
        ? (prev - 1 + images.length) % images.length
        : null
    );

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.targetTouches[0];
    setIsDragging(true);
    setDragX(0);
    setDragY(0);
    setTouchStart({ x: t.clientX, y: t.clientY });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const t = e.targetTouches[0];

    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;

    // “podążanie” — pełne X, delikatne Y (żeby nie było za agresywnie)
    setDragX(dx);
    setDragY(dy * 0.6);
  };

  const onTouchEnd = () => {
    setIsDragging(false);

    // swipe down to close
    if (dragY > SWIPE_CLOSE) {
      setDragX(0);
      setDragY(0);
      close();
      return;
    }

    // zmiana zdjęcia po X
    if (dragX <= -SWIPE_CHANGE) {
      next();
    } else if (dragX >= SWIPE_CHANGE) {
      prev();
    }

    // “sprężynka” powrót do 0 (CSS transition)
    setDragX(0);
    setDragY(0);
    setTouchStart(null);
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [activeIndex]);

  useEffect(() => {
  if (activeIndex === null) return;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsClosing(true);
      setTimeout(() => {
        setActiveIndex(null);
        setIsClosing(false);
      }, 200);
      return;
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : prev));
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev !== null ? (prev - 1 + images.length) % images.length : prev
      );
      return;
    }
  };

  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  return (
    <section id="referanser" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold">Referanser</h2>
      <p className="mt-3 text-gray-600 max-w-2xl">
        100% ekte parkettprosjekter levert det siste året i Oslo og omegn.
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((img, index) => (
          <div
            key={img.src}
            className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 cursor-pointer group"
            onClick={() => open(index)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-200
          ${isClosing ? "opacity-0" : "opacity-100"}
          ${isDragging ? "opacity-90" : ""}`}
          onClick={close}
        >
          <div
            className={`relative w-[90vw] max-w-5xl aspect-[4/3] touch-pan-y
            ${isDragging ? "transition-none" : "transition-transform duration-300 ease-out"}`}
            style={{ transform: modalTransform }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain rounded-xl"
              sizes="90vw"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {activeIndex + 1} / {images.length}
            </div>
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
