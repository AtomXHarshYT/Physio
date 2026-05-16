"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "98%",
    title: "Recovery Success",
  },
  {
    number: "1K+",
    title: "Clients Trained",
  },
  {
    number: "15+",
    title: "Performance Programs",
  },
  {
    number: "24/7",
    title: "Support System",
  },
];

export default function Performance() {
  return (
    <section id="performance" className="py-20 md:py-32 relative z-10">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm">
              Performance
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
              Built For Recovery, Strength & Elite Movement
            </h2>

            <p className="text-zinc-400 mt-8 text-lg leading-relaxed">
              Advanced recovery systems and performance coaching
              designed to help athletes and individuals move,
              recover, and perform at their highest level.
            </p>

            <button className="mt-10 bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition duration-300">
              Explore Programs
            </button>

          </motion.div>

          {/* Right Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-10"
              >

                <h3 className="text-5xl font-bold text-yellow-400">
                  {item.number}
                </h3>

                <p className="text-zinc-400 mt-4 text-lg">
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