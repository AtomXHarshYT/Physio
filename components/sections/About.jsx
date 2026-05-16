"use client";

import Floating from "@/components/animations/Floating";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[80px] md:blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >

            <Floating>
              <div className="aspect-square rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden p-8">

                <div className="w-full h-full rounded-[30px] bg-gradient-to-br from-yellow-400/20 to-blue-500/20 flex items-center justify-center">

                  <div className="w-40 h-40 rounded-full bg-yellow-400/20 backdrop-blur-3xl flex items-center justify-center animate-pulse">

                    <div className="w-20 h-20 rounded-full bg-yellow-400" />

                  </div>

                </div>

              </div>
            </Floating>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm">
              About Experience
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
              Modern Recovery Built Around Human Performance
            </h2>

            <p className="text-zinc-400 mt-8 leading-relaxed text-lg">
              Combining physiotherapy, mobility systems, strength
              development, and recovery science into one futuristic
              performance experience designed for long-term results.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-12">

              <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
                <h3 className="text-3xl font-bold text-yellow-400">
                  12+
                </h3>

                <p className="text-zinc-400 mt-2">
                  Years Coaching
                </p>
              </div>

              <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
                <h3 className="text-3xl font-bold text-blue-400">
                  50+
                </h3>

                <p className="text-zinc-400 mt-2">
                  Elite Athletes
                </p>
              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}