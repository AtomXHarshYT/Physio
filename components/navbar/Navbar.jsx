"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* CLOSE MENU ON ESC */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  /* PREVENT BODY SCROLL WHEN MENU OPEN */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-[var(--border)] bg-black/40 backdrop-blur-xl">

      <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-[var(--text)]"
        >
          ThriveFit<span className="text-[var(--primary)]">Club</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">

          <a href="#services">Services</a>

          <a href="#performance">Performance</a>

          <a href="#testimonials">Testimonials</a>

          <a href="#consultation">Consultation</a>

        </div>

        {/* Desktop Button */}
        <a
          href="#consultation"
          className="hidden md:flex bg-[var(--primary)] text-black px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition"
        >
          Book Consultation
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className="w-6 h-0.5 bg-[var(--text)] rounded-full" />

          <span className="w-6 h-0.5 bg-[var(--text)] rounded-full" />

          <span className="w-6 h-0.5 bg-[var(--text)] rounded-full" />
        </button>

      </nav>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <>
          {/* BACKDROP */}
          <div
            onClick={closeMenu}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden"
          />

          {/* MOBILE MENU */}
          <div className="fixed top-0 right-0 h-screen w-[85%] max-w-[320px] bg-[var(--secondary)] border-l border-[var(--border)] z-50 md:hidden">

            {/* TOP BAR */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-[var(--border)]">

              <h2 className="text-lg font-semibold text-[var(--text)]">
                Menu
              </h2>

              {/* CLOSE BUTTON */}
              <button
                onClick={closeMenu}
                className="text-3xl text-[var(--text)] leading-none"
              >
                ×
              </button>

            </div>

            {/* MENU LINKS */}
            <div className="flex flex-col px-6 py-8 gap-6 text-[var(--muted)] text-lg">

              <a
                href="#services"
                onClick={closeMenu}
              >
                Services
              </a>

              <a
                href="#performance"
                onClick={closeMenu}
              >
                Performance
              </a>

              <a
                href="#testimonials"
                onClick={closeMenu}
              >
                Testimonials
              </a>

              <a
                href="#consultation"
                onClick={closeMenu}
              >
                Consultation
              </a>

              <a
                href="#consultation"
                onClick={closeMenu}
                className="bg-[var(--primary)] text-black py-3 rounded-full font-medium text-center mt-4"
              >
                Book Consultation
              </a>

            </div>

          </div>
        </>
      )}

    </header>
  );
}