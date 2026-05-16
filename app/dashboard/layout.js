"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function DashboardLayout({
  children,
}) {

  const pathname = usePathname();

  const links = [
    {
      name: "Consultations",
      href: "/dashboard",
    },
    {
      name: "Appointments",
      href: "/dashboard/appointments",
    },
  ];

  const handleLogout = async () => {

    await supabase.auth.signOut();

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">

      {/* Sidebar */}
      <aside className="w-[280px] border-r border-white/10 bg-black/30 backdrop-blur-xl hidden md:flex flex-col p-6">

        {/* Logo */}
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

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl z-50">

        {/* Top */}
        <div className="h-16 flex items-center justify-between px-4">

          <h1 className="text-xl font-bold">
            Physio
            <span className="text-yellow-400">
              X
            </span>
          </h1>

          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-black px-3 py-1.5 rounded-full text-xs font-medium"
          >
            Logout
          </button>

        </div>

        {/* Mobile Nav */}
        <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto">

          {links.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs transition ${pathname === item.href
                  ? "bg-yellow-400 text-black"
                  : "bg-white/5 text-zinc-300"
                }`}
            >
              {item.name}
            </Link>

          ))}

        </div>

      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 md:ml-0 mt-[5.5rem] md:mt-0">
        {children}
      </main>

    </div>
  );
}