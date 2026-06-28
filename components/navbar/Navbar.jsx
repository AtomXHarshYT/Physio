"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

      <nav className="w-full px-2 md:px-4 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="ThriveFit Club Logo"
            width={48}
            height={48}
            className="object-contain"
            priority
          />

          <h1 className="text-2xl font-bold tracking-wide text-[var(--text)]">
            ThriveFit<span className="text-[var(--primary)]">Club</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">

          <a href="#services" className="transition-colors duration-300 hover:text-[var(--primary)]">Services</a>

          <a href="#performance" className="transition-colors duration-300 hover:text-[var(--primary)]">Performance</a>

          <a href="#testimonials" className="transition-colors duration-300 hover:text-[var(--primary)]">Testimonials</a>

          <a href="#consultation" className="transition-colors duration-300 hover:text-[var(--primary)]">Consultation</a>

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
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden"
            />

            {/* MOBILE MENU */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-0 right-0 h-screen w-[85%] max-w-[320px] overflow-hidden bg-black/80 backdrop-blur-3xl border-l border-white/10 z-50 md:hidden"
            >
              {/* Ambient Glow */}
              <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-[var(--primary)]/20 blur-[120px] pointer-events-none" />

              <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-sky-400/10 blur-[120px] pointer-events-none" />

              <div className="absolute top-1/2 right-10 -translate-y-1/2 w-56 h-56 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />
              {/* TOP BAR */}
              
              <div className="relative z-10 flex items-center justify-between px-6 h-20 border-b border-white/10">

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
              <div className="relative z-10 flex flex-col px-5 py-6 gap-3">

                <a
                  href="#services"
                  onClick={closeMenu}
                  className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.05] backdrop-blur-md px-5 py-4 transition-all duration-300 hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/10"
                >
                  <span className="font-medium text-white">
                    Services
                  </span>

                  <span className="text-xl text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#performance"
                  onClick={closeMenu}
                  className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.05] backdrop-blur-md px-5 py-4 transition-all duration-300 hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/10"
                >
                  <span className="font-medium text-white">
                    Performance
                  </span>

                  <span className="text-xl text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#testimonials"
                  onClick={closeMenu}
                  className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.05] backdrop-blur-md px-5 py-4 transition-all duration-300 hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/10"
                >
                  <span className="font-medium text-white">
                    Testimonials
                  </span>

                  <span className="text-xl text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#consultation"
                  onClick={closeMenu}
                  className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.05] backdrop-blur-md px-5 py-4 transition-all duration-300 hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/10"
                >
                  <span className="font-medium text-white">
                    Consultation
                  </span>

                  <span className="text-xl text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#consultation"
                  onClick={closeMenu}
                  className="bg-[var(--primary)] text-black py-3 rounded-full font-medium text-center mt-4"
                >
                  Book Consultation
                </a>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}