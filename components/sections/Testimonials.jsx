"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Athlete",
    review:
      "The recovery and mobility coaching completely transformed my performance and reduced long-term pain.",
  },
  {
    name: "Priya Mehta",
    role: "Fitness Client",
    review:
      "Professional guidance, premium experience, and incredible recovery support throughout the journey.",
  },
  {
    name: "Arjun Patel",
    role: "Football Player",
    review:
      "One of the best rehabilitation systems I’ve experienced. Everything feels modern and personalized.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute right-0 top-20 w-[400px] h-[400px] bg-yellow-400/10 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >

          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mt-6">
            Trusted By Athletes & Clients
          </h2>

          <p className="text-zinc-400 mt-6 leading-relaxed">
            Real transformation stories from clients focused on
            recovery, mobility, rehabilitation, and performance.
          </p>

        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8"
            >

              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 text-xl">
                ★★★★★
              </div>

              <p className="text-zinc-300 mt-6 leading-relaxed">
                "{item.review}"
              </p>

              <div className="mt-8">

                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-zinc-500 text-sm mt-1">
                  {item.role}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}