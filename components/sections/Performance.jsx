"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  {
    number: "95%",
    title: "Recovery Success",
  },
  {
    number: "1K+",
    title: "Clients Trained",
  },
  {
    number: "12+",
    title: "Performance Programs",
  },
  {
    number: "24/7",
    title: "Support System",
  },
];

export default function Performance() {
  return (
    <section id="performance" className="py-14 md:py-32 relative z-10">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-0"
          >

            <p className="text-[var(--primary)] uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm">
              Performance
            </p>

            <div className="overflow-hidden mt-4 md:mt-6">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-6xl font-bold leading-[1.1]"
              >
                Built For Recovery, Strength & Elite Movement
              </motion.h2>
            </div>

            <p className="text-[var(--muted)] mt-4 md:mt-8 text-sm sm:text-base md:text-lg leading-relaxed">
              Advanced recovery systems and performance coaching
              designed to help athletes and individuals move,
              recover, and perform at their highest level.
            </p>

          </motion.div>

          {/* Right Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">

            {stats.map((item, index) => (
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                }}
                transition={{
                  duration: 0.3,
                }}
                viewport={{ once: true }}
                className="group border border-[var(--border)] bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-10 transition-all duration-300 hover:border-[var(--primary)] hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(0,255,170,0.18)] cursor-pointer"
              >

                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--primary)] transition-all duration-300 group-hover:scale-110">
                  {item.number.includes("%") ? (
                    <>
                      <CountUp end={95} duration={2.5} enableScrollSpy />%
                    </>
                  ) : item.number.includes("K+") ? (
                    <>
                      <CountUp end={1} duration={2.5} enableScrollSpy />K+
                    </>
                  ) : item.number.includes("+") ? (
                    <>
                      <CountUp end={12} duration={2.5} enableScrollSpy />+
                    </>
                  ) : (
                    <>
                      <CountUp end={24} duration={2.5} enableScrollSpy />/7
                    </>
                  )}
                </h3>

                <p className="text-[var(--muted)] mt-2 md:mt-4 text-xs sm:text-sm md:text-lg">
                  {item.title}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}