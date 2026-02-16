"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const heroImages = ["/bg_01.jpg", "/bg_02.jpg", "/bg_03.jpg"];

export default function HeroImage() {
  const [index, setIndex] = useState(0);

useEffect(() => {
  const prefersReduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (prefersReduced) return;

  const interval = setInterval(() => {
    if (document.hidden) return;
    setIndex((prev) => (prev + 1) % heroImages.length);
  }, 9000);

  return () => clearInterval(interval);
}, []);


  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-gray-200 bg-[#F5F3EF]">
      {heroImages.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Parkettlegging i Oslo"
          fill
          priority={i === 0}
          className={`object-cover absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ))}
    </div>
  );
}
