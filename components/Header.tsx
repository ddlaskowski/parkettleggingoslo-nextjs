"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { navigationItems } from "@/lib/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur border-b border-gray-200 z-50 text-[#1E1E1E]"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/#hjem" className="font-semibold tracking-tight" onClick={() => setMenuOpen(false)}>
          Parkettlegging Oslo
        </Link>

        <nav aria-label="Hovedmeny" className="hidden md:flex items-center gap-4 text-sm text-gray-700">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-black">{item.label}</Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#kontakt"
            className="bg-[#C69C6D] hover:bg-[#B68655] text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Gratis befaring
          </Link>
        </div>
        <button
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden min-h-11 px-3 border border-gray-300 rounded-lg text-sm"
        >
          {menuOpen ? "Lukk meny" : "Meny"}
        </button>
      </div>
      <nav id="mobile-navigation" aria-label="Mobilmeny" hidden={!menuOpen} className="md:hidden border-t border-gray-200 px-6 py-3 max-h-[calc(100dvh-4rem)] overflow-y-auto">
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block py-3 text-sm hover:underline">
            {item.label}
          </Link>
        ))}
        <Link href="/#kontakt" onClick={() => setMenuOpen(false)} className="inline-block my-2 bg-[#C69C6D] text-white px-4 py-3 rounded-lg text-sm">
          Gratis befaring
        </Link>
      </nav>
    </header>
  );
}
