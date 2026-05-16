"use client";

import { motion } from "framer-motion";

const packages = [
  {
    title: "Starter Recovery",
    price: "₹4,999",
    features: [
      "Mobility Assessment",
      "Weekly Consultation",
      "Recovery Plan",
      "WhatsApp Support",
    ],
  },
  {
    title: "Performance Pro",
    price: "₹9,999",
    features: [
      "Strength Coaching",
      "Custom Rehab Program",
      "Nutrition Guidance",
      "Priority Support",
    ],
    featured: true,
  },
  {
    title: "Elite Athlete",
    price: "₹19,999",
    features: [
      "Advanced Performance Training",
      "Injury Prevention System",
      "Recovery Monitoring",
      "Full Premium Support",
    ],
  },
];

export default function Packages() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-blue-500/10 blur-[80px] md:blur-[150px] rounded-full" />

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
            Packages
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mt-6">
            Choose Your Recovery Journey
          </h2>

          <p className="text-zinc-400 mt-6 leading-relaxed">
            Flexible performance and rehabilitation programs
            tailored for recovery, strength, and long-term mobility.
          </p>

        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">

          {packages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className={`rounded-3xl p-8 border backdrop-blur-xl hover:-translate-y-3 transition duration-300 ${
                item.featured
                  ? "border-yellow-400 bg-yellow-400/10 scale-105"
                  : "border-white/10 bg-white/5"
              }`}
            >

              <h3 className="text-2xl font-semibold">
                {item.title}
              </h3>

              <h2 className="text-5xl font-bold mt-6 text-yellow-400">
                {item.price}
              </h2>

              <div className="mt-8 space-y-4">

                {item.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-zinc-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />

                    <p>{feature}</p>
                  </div>
                ))}

              </div>

              <button
                className={`w-full mt-10 py-3 rounded-full font-medium transition duration-300 ${
                  item.featured
                    ? "bg-yellow-400 text-black hover:scale-105"
                    : "border border-white/10 hover:bg-white/10"
                }`}
              >
                Get Started
              </button>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}