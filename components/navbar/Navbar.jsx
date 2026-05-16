"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-xl bg-black/30">

      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-white"
        >
          Physio<span className="text-yellow-400">X</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">

          <a href="#services">Services</a>

          <a href="#performance">Performance</a>

          <a href="#testimonials">Testimonials</a>

          <a href="#consultation">Consultation</a>

        </div>

        {/* Desktop Button */}
        <button className="hidden md:block bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition">
          Book Consultation
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-[2px] bg-white" />

          <span className="w-6 h-[2px] bg-white" />

          <span className="w-6 h-[2px] bg-white" />
        </button>

      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">

          <div className="flex flex-col px-6 py-8 gap-6 text-zinc-300">

            <a href="#services">Services</a>

            <a href="#performance">Performance</a>

            <a href="#testimonials">Testimonials</a>

            <a href="#consultation">Consultation</a>

            <button className="bg-yellow-400 text-black py-3 rounded-full font-medium mt-4">
              Book Consultation
            </button>

          </div>

        </div>
      )}

    </header>
  );
}