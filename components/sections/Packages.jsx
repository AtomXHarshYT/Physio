"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  useEffect(() => {

    async function fetchPackages() {

      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("id", { ascending: true });

      if (!error) {
        setPackages(data);
      }
    }

    fetchPackages();

  }, []);
  return (
    <section className="py-14 md:py-32 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >

          <p className="text-[var(--primary)] uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm">
            Packages
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mt-4 md:mt-6 leading-[1.1]">
            Choose Your Recovery Journey
          </h2>

          <p className="text-[11px] sm:text-sm md:text-base text-[var(--muted)] mt-4 md:mt-6 leading-relaxed">
            Flexible performance and rehabilitation programs
            tailored for recovery, strength, and long-term mobility.
          </p>

        </motion.div>

        {/* Mobile Slider */}
        <div className="mt-10 md:mt-20 lg:hidden">

          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.1}
            initialSlide={0}
            loop={true}
            speed={800}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.4,
              },
              768: {
                slidesPerView: 2,
              },
            }}
          >

            {packages.map((item, index) => (
              <SwiperSlide key={index}>

                <div
                  className={`h-full rounded-2xl p-4 border backdrop-blur-xl transition duration-500 ${item.featured
                    ? "border-[var(--primary)] bg-[var(--primary)]/10"
                    : "border-[var(--border)] bg-white/5"
                    }`}
                >

                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>

                  <h2 className="text-3xl font-bold mt-4 text-[var(--primary)]">
                    {item.price}
                  </h2>

                  <div className="mt-5 space-y-3">

                    {item.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-[var(--text)]"
                      >

                        <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2" />

                        <p className="text-xs leading-relaxed">
                          {feature}
                        </p>

                      </div>
                    ))}

                  </div>
                  <a href="#consultation">
                    <button
                      className={`w-full mt-6 py-2.5 rounded-full text-sm font-medium transition duration-300 ${item.featured
                        ? "bg-[var(--primary)] text-[var(--background)]"
                        : "border border-[var(--border)] hover:bg-white/10"
                        }`}
                    >
                      Get Started
                    </button>
                  </a>
                </div>

              </SwiperSlide>
            ))}

          </Swiper>

        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mt-20">

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
              className={`rounded-3xl p-8 border backdrop-blur-xl hover:-translate-y-3 transition duration-300 ${item.featured
                ? "border-[var(--primary)] bg-[var(--primary)]/10 scale-105"
                : "border-[var(--border)] bg-white/5"
                }`}
            >

              <h3 className="text-2xl font-semibold">
                {item.title}
              </h3>

              <h2 className="text-5xl font-bold mt-6 text-[var(--primary)]">
                {item.price}
              </h2>

              <div className="mt-8 space-y-4">

                {item.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-[var(--text)]"
                  >

                    <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2" />

                    <p className="text-base leading-relaxed">
                      {feature}
                    </p>

                  </div>
                ))}

              </div>
              <a href="#consultation">
                <button
                  className={`w-full mt-10 py-3 rounded-full text-base font-medium transition duration-300 ${item.featured
                    ? "bg-[var(--primary)] text-[var(--background)] hover:scale-105"
                    : "border border-[var(--border)] hover:bg-white/10"
                    }`}
                >
                  Get Started
                </button>
              </a>
            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}