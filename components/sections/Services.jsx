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
    <section id="services" className="py-20 md:py-32 relative z-10">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <SectionTitle
          tag="Services"
          title="Premium Recovery & Performance"
          description="Elite physiotherapy and performance systems designed for modern recovery and long-term body optimization."
        />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 hover:border-yellow-400/30 hover:-translate-y-2 hover:bg-white/[0.07] transition duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 flex items-center justify-center mb-6">
                <div className="w-6 h-6 rounded-full bg-yellow-400" />
              </div>

              <h3 className="text-2xl font-semibold">
                {service.title}
              </h3>

              <p className="text-zinc-400 mt-4 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}