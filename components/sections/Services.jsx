"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

const services = [
  {
    title: "Physiotherapy",
    description:
      "Advanced rehabilitation programs focused on pain relief and recovery.",
  },
  {
    title: "Sports Rehab",
    description:
      "Personalized recovery systems for athletes and active individuals.",
  },
  {
    title: "Mobility Coaching",
    description:
      "Improve flexibility, posture, and movement performance.",
  },
  {
    title: "Strength Training",
    description:
      "Build strength safely with performance-focused coaching.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-14 md:py-32 relative z-10">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <SectionTitle
          tag="Services"
          title="Premium Recovery & Performance"
          description="Elite physiotherapy and performance systems designed for modern recovery and long-term body optimization."
        />

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mt-14 md:mt-20">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 hover:border-yellow-400/30 md:hover:-translate-y-2 hover:bg-white/[0.07] transition duration-300"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-yellow-400/10 flex items-center justify-center mb-3 md:mb-6">
                <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-yellow-400" />
              </div>

              <h3 className="text-sm sm:text-base md:text-2xl font-semibold leading-tight">
                {service.title}
              </h3>

              <p className="text-[11px] sm:text-xs md:text-base text-zinc-400 mt-2 md:mt-4 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}