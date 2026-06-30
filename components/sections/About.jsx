"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const images = [
    "/about/about1.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);
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


            <div className="aspect-square rounded-3xl md:rounded-[40px] border border-[var(--border)] bg-white/5 backdrop-blur-xl overflow-hidden p-4 md:p-8">

              <div className="relative w-full h-full rounded-2xl md:rounded-[30px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImage]}
                      alt="Clinic"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <p className="text-[var(--primary)] uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm">
              About Experience
            </p>

            <div className="overflow-hidden mt-4 md:mt-6">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-6xl font-bold leading-[1.1]"
              >
                Modern Recovery Built Around Human Performance
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-[var(--muted)] mt-4 md:mt-8 leading-relaxed text-sm sm:text-base md:text-lg"
            >
              Combining physiotherapy, mobility systems, strength
              development, and recovery science into one futuristic
              performance experience designed for long-term results.
            </motion.p>

            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">

              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.04,
                }}
                transition={{ duration: 0.25 }}
                className="group border border-[var(--border)] rounded-2xl md:rounded-3xl p-4 md:p-6 bg-white/5 hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--primary)] transition-transform duration-300 group-hover:scale-110">
                  <CountUp
                    start={0}
                    end={5}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </h3>

                <p className="text-[var(--muted)] text-xs sm:text-sm md:text-base mt-1 md:mt-2">
                  Years Coaching
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.04,
                }}
                transition={{ duration: 0.25 }}
                className="group border border-[var(--border)] rounded-2xl md:rounded-3xl p-4 md:p-6 bg-white/5 hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
                  <CountUp
                    start={0}
                    end={50}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  +
                </h3>

                <p className="text-[var(--muted)] text-xs sm:text-sm md:text-base mt-1 md:mt-2">
                  Elite Athletes
                </p>
              </motion.div>

            </div>

          </motion.div>

        </div>

      </div >

    </section >
  );
}