"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function LayoutWrapper({
  children,
}) {

  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/portal");

  return (
    <>
      {!hideLayout && <Navbar />}

      <main className="min-h-screen">
        {children}
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}