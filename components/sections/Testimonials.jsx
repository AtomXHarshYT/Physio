"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Testimonials() {

  const [testimonials, setTestimonials] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {

    async function fetchTestimonials() {

      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("id", { ascending: false });

      if (!error) {
        setTestimonials(data);
      }
    }

    fetchTestimonials();

  }, []);
  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials]);
  return (
    <section id="testimonials" className="py-14 md:py-32 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >

          <p className="text-[var(--primary)] uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm">
            Testimonials
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mt-4 md:mt-6 leading-[1.1]">
            Trusted By Athletes & Clients
          </h2>

          <p className="text-[11px] sm:text-sm md:text-base text-[var(--muted)] mt-4 md:mt-6 leading-relaxed">
            Real transformation stories from clients focused on
            recovery, mobility, rehabilitation, and performance.
          </p>

        </motion.div>

        {/* Cards */}
        {/* Mobile Testimonials */}
        <div className="md:hidden mt-10 relative h-[380px] px-4 py-6 flex items-center justify-center">

          {testimonials.map((item, index) => {
            const position = (index - active + testimonials.length) % testimonials.length;

            if (position > 2) return null;

            const styles = [
              {
                x: 0,
                scale: 1,
                opacity: 1,
                rotateY: 0,
                zIndex: 30,
              },
              {
                x: 22,
                scale: 0.95,
                opacity: 0.6,
                rotateY: -8,
                zIndex: 20,
              },
              {
                x: 44,
                scale: 0.9,
                opacity: 0.35,
                rotateY: -12,
                zIndex: 10,
              },
            ];

            return (
              <motion.div
                key={item.id}
                animate={styles[position]}
                transition={{
                  duration: 0.75,
                  ease: "easeInOut",
                }}
                className="absolute w-[92%] rounded-3xl border border-[var(--border)] bg-white/5 backdrop-blur-xl p-6"
              >
                <div className="flex gap-1 text-[var(--primary)] text-lg">
                  {"★".repeat(item.rating || 5)}
                </div>

                <p className="text-sm mt-4 leading-relaxed">
                  "{item.review}"
                </p>

                <div className="mt-6">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-xs text-[var(--muted)]">
                    {item.role}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-20">

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
              className="border border-[var(--border)] bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8"
            >

              {/* Stars */}
              <div className="flex gap-1 text-[var(--primary)] text-sm md:text-xl">
                {"★".repeat(item.rating || 5)}
              </div>

              <p className="text-[11px] sm:text-xs md:text-base text-[var(--text)] mt-3 md:mt-6 leading-relaxed">
                "{item.review}"
              </p>

              <div className="mt-4 md:mt-8">

                <h3 className="font-semibold text-sm md:text-lg">
                  {item.name}
                </h3>

                <p className="text-[var(--muted)] text-[10px] md:text-sm mt-1">
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