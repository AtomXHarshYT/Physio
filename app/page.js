"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Services from "@/components/sections/Services";
import Performance from "@/components/sections/Performance";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Packages from "@/components/sections/Packages";
import Consultation from "@/components/sections/Consultation";
import Experience from "@/components/sections/Experience";
import PageTransition from "@/components/animations/PageTransition";
import Button from "@/components/ui/Button";
import Booking from "@/components/sections/Booking";


export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen text-white relative overflow-hidden">

        {/* Glow Effects */}
        <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-yellow-400/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />

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
              className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl"
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
              <Button>
                Start Consultation
              </Button>

              <Button variant="secondary">
                Explore Services
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
            >

              <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8">
                <h2 className="text-4xl font-bold text-yellow-400">
                  500+
                </h2>

                <p className="text-zinc-400 mt-2">
                  Successful Recoveries
                </p>
              </div>

              <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8">
                <h2 className="text-4xl font-bold text-blue-400">
                  10+
                </h2>

                <p className="text-zinc-400 mt-2">
                  Years Experience
                </p>
              </div>

              <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8">
                <h2 className="text-4xl font-bold text-white">
                  24/7
                </h2>

                <p className="text-zinc-400 mt-2">
                  Client Support
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
        <Experience />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <Packages />
        <div className="section-divider" />
        <Consultation />
        <div className="section-divider" />
        <Booking />
      </main>
    </PageTransition>
  );
}