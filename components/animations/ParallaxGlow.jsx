"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxGlow() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);

  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <>
      <motion.div
        style={{ y: y1 }}
        className="fixed top-0 left-0 w-50 sm:w-75 md:w-100 h-50 sm:h-75 md:h-100 bg-yellow-400/10 blur-[80px] sm:blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-0"
      />

      <motion.div
        style={{ y: y2 }}
        className="fixed bottom-0 right-0 w-50 sm:w-75 md:w-100 h-50 sm:h-75 md:h-100 bg-blue-500/10 blur-[80px] sm:blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-0"
      />
    </>
  );
}