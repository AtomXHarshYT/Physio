"use client";

import { motion } from "framer-motion";

import Ball from "@/components/three/Ball";

export default function Experience() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/10 blur-[80px] md:blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm">
              3D Experience
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
              Interactive Recovery Technology
            </h2>

            <p className="text-zinc-400 mt-8 text-lg leading-relaxed">
              A futuristic recovery and performance experience
              combining immersive visuals, movement science,
              and modern rehabilitation systems.
            </p>

          </motion.div>

          {/* Right 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border border-white/10 bg-white/5 rounded-[40px] backdrop-blur-xl overflow-hidden"
          >

            <Ball />

          </motion.div>

        </div>

      </div>

    </section>
  );
}