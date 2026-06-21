"use client";

import Floating from "@/components/animations/Floating";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-14 md:py-32 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* Left Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >

            <Floating>
              <div className="aspect-square rounded-3xl md:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden p-4 md:p-8">

                <div className="w-full h-full rounded-2xl md:rounded-[30px] bg-linear-to-br from-yellow-400/20 to-blue-500/20 flex items-center justify-center">

                  <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-yellow-400/5 backdrop-blur-3xl flex items-center justify-center animate-pulse">

                    <div className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-yellow-400" />

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

            <p className="text-yellow-400 uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm">
              About Experience
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mt-4 md:mt-6 leading-[1.1]">
              Modern Recovery Built Around Human Performance
            </h2>

            <p className="text-zinc-400 mt-4 md:mt-8 leading-relaxed text-sm sm:text-base md:text-lg">
              Combining physiotherapy, mobility systems, strength
              development, and recovery science into one futuristic
              performance experience designed for long-term results.
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">

              <div className="border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 bg-white/5">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">
                  5
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm md:text-base mt-1 md:mt-2">
                  Years Coaching
                </p>
              </div>

              <div className="border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 bg-white/5">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">
                  50+
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm md:text-base mt-1 md:mt-2">
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