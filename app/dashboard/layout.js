"use client";

import Link from "next/link";

import {
  usePathname, useRouter
} from "next/navigation";

import { useState, useEffect } from "react";

import { supabase } from "@/lib/supabase";

export default function DashboardLayout({
  children,
}) {

  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const links = [
    {
      name: "Consultations",
      href: "/dashboard",
    },
    {
      name: "Testimonials",
      href: "/dashboard/testimonials",
    },
  ];

  const handleLogout = async () => {

    await supabase.auth.signOut();

    localStorage.clear();

    sessionStorage.clear();

    window.location.replace("/portal")
  };

  /* LOCK BODY SCROLL */
  useEffect(() => {

    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">

      {/* DESKTOP SIDEBAR */}
      <aside className="w-70 border-r border-white/10 bg-black/30 backdrop-blur-xl hidden md:flex flex-col p-6">

        {/* Logo */}
        <div>

          <h1 className="text-3xl font-bold">
            ThriveFit
            <span className="text-yellow-400">
              Club
            </span>
          </h1>

          <p className="text-zinc-500 mt-2 text-sm">
            Admin Dashboard
          </p>

        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col gap-3">

          {links.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              className={`px-5 py-3 rounded-2xl transition ${pathname === item.href
                ? "bg-yellow-400 text-black"
                : "hover:bg-white/10 text-zinc-300"
                }`}
            >
              {item.name}
            </Link>

          ))}

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-yellow-400 text-black py-3 rounded-2xl font-semibold"
        >
          Logout
        </button>

      </aside>

      {/* MOBILE TOPBAR */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 border-b border-white/10 bg-black/80 backdrop-blur-xl z-50">

        <div className="h-full px-4 flex items-center justify-between">

          {/* MENU BUTTON */}
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="flex flex-col gap-1.5"
          >

            <span className="w-6 h-0.5 bg-white rounded-full" />

            <span className="w-6 h-0.5 bg-white rounded-full" />

            <span className="w-6 h-0.5 bg-white rounded-full" />

          </button>

          {/* LOGO */}
          <h1 className="text-xl font-bold">
            Physio
            <span className="text-yellow-400">
              X
            </span>
          </h1>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-black px-3 py-1.5 rounded-full text-xs font-medium"
          >
            Logout
          </button>

        </div>

      </div>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
        />

      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-70 bg-[#0F0F0F] border-r border-white/10 z-50 transform transition duration-300 md:hidden ${sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
          }`}
      >

        <div className="flex flex-col h-full p-6">

          {/* TOP */}
          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Physio
                <span className="text-yellow-400">
                  X
                </span>
              </h1>

              <p className="text-zinc-500 mt-2 text-sm">
                Admin Dashboard
              </p>

            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="text-3xl text-white"
            >
              ×
            </button>

          </div>

          {/* NAVIGATION */}
          <div className="mt-12 flex flex-col gap-3">

            {links.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                onClick={() =>
                  setSidebarOpen(false)
                }
                className={`px-5 py-3 rounded-2xl transition ${pathname === item.href
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-white/10 text-zinc-300"
                  }`}
              >
                {item.name}
              </Link>

            ))}

          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-auto bg-yellow-400 text-black py-3 rounded-2xl font-semibold"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-10 mt-16 md:mt-0">
        {children}
      </main>

    </div>
  );
}