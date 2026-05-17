"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Services from "@/components/sections/Services";
import Performance from "@/components/sections/Performance";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Packages from "@/components/sections/Packages";
import Consultation from "@/components/sections/Consultation";
import PageTransition from "@/components/animations/PageTransition";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen text-white relative overflow-hidden">

        {/* Hero Section */}
        <section className="pt-40 pb-32 relative z-10">
          <Container>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-6"
            >
              Elite Recovery & Performance
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl"
            >
              Transform Your Body With Futuristic Physiotherapy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-zinc-400 text-lg mt-8 max-w-2xl leading-relaxed"
            >
              Premium sports rehab, mobility coaching, injury recovery,
              and performance optimization built for modern athletes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <a href="#consultation">
                <Button>
                  Start Consultation
                </Button>
              </a>
              <a href="#services">
              <Button variant="secondary">
                Explore Services
              </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-14 md:mt-20"
            >

              <div className="border border-white/10 bg-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8">
                <h2 className="text-2xl md:text-4xl font-bold text-yellow-400">
                  500+
                </h2>

                <p className="text-zinc-400 text-sm md:text-base mt-1 md:mt-2">
                  Successful Recoveries
                </p>
              </div>

              <div className="border border-white/10 bg-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8">
                <h2 className="text-2xl md:text-4xl font-bold text-blue-400">
                  10+
                </h2>

                <p className="text-zinc-400 text-sm md:text-base mt-1 md:mt-2">
                  Years Experience
                </p>
              </div>
            </motion.div>

          </Container>
        </section>
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Performance />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <Packages />
        <div className="section-divider" />
        <Consultation />
      </main>
    </PageTransition >
  );
}