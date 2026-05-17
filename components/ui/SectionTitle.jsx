"use client";

import { motion } from "framer-motion";

export default function SectionTitle({
  tag,
  title,
  description,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto"
    >

      <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm">
        {tag}
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-sm md:text-base text-zinc-400 mt-6 leading-relaxed">
        {description}
      </p>

    </motion.div>
  );
}