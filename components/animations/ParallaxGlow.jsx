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
        className="fixed top-0 left-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-yellow-400/10 blur-[80px] sm:blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-0"
      />

      <motion.div
        style={{ y: y2 }}
        className="fixed bottom-0 right-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-blue-500/10 blur-[80px] sm:blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-0"
      />
    </>
  );
}