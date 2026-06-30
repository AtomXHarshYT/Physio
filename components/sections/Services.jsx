"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase";
import SectionTitle from "@/components/ui/SectionTitle";
import TiltCard from "@/components/ui/TiltCard";
import Image from "next/image";

export default function Services() {
  const [services, setServices] = useState([]);
  const [flippedCard, setFlippedCard] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    setServices(data || []);
  }

  return (
    <section id="services" className="py-14 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <SectionTitle
          tag="Services"
          title="Premium Recovery & Performance"
          description="Elite physiotherapy and performance systems designed for modern recovery and long-term body optimization."
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mt-14 md:mt-20"
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              }
            }
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id || index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 60,
                  scale: 0.95,
                  filter: "blur(12px)"
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                    duration: 0.8,
                  }
                }
              }}
            >
              <TiltCard
                className="group border border-[var(--border)] bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-1 md:p-8 hover:border-[var(--primary)]/60 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] relative overflow-hidden"
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.08), transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* Mobile Card */}
                <div className="md:hidden relative h-48 rounded-2xl overflow-hidden">

                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  <motion.div
                    className="absolute inset-0"
                    initial={false}
                    animate={{ rotateY: flippedCard === index ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >

                    {/* FRONT */}
                    <div
                      className="absolute inset-0 flex items-end justify-between p-2.5"
                      style={{ backfaceVisibility: "hidden" }}
                      onClick={() => setFlippedCard(index)}
                    >
                      <h3 className="text-white text-base font-semibold leading-tight">
                        {service.title}
                      </h3>

                      <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
                        →
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      className="absolute inset-0 bg-black/90 p-5 flex flex-col justify-between"
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                      }}
                      onClick={() => setFlippedCard(null)}
                    >
                      <div>
                        <h3 className="text-white text-base font-semibold leading-tight">
                          {service.title}
                        </h3>

                        <p className="text-[11px] md:text-base text-white/80 mt-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                  </motion.div>

                </div>
                <div className="hidden md:flex md:flex-col">

                  {/* Service Image */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-64 rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Text */}
                  <div className="mt-5">

                    <motion.h3
                      className="text-sm sm:text-base md:text-2xl font-semibold leading-tight group-hover:text-[var(--primary)] transition-colors duration-300"
                    >
                      {service.title}
                    </motion.h3>

                    <motion.p
                      className="text-[11px] sm:text-xs md:text-base text-[var(--muted)] mt-2 md:mt-4 leading-relaxed group-hover:text-[var(--foreground)] transition-colors duration-300"
                    >
                      {service.description}
                    </motion.p>

                  </div>

                </div>

                {/* Decorative corner accent */}
                <motion.div
                  className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-[var(--primary)]/5 group-hover:bg-[var(--primary)]/10 transition-all duration-700"
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                />

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-[var(--primary)]"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}