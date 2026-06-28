"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Services() {
  const [services, setServices] = useState([]);

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

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mt-14 md:mt-20">

          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-[var(--border)] bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 hover:border-[var(--primary)]/30 md:hover:-translate-y-2 hover:bg-white/[0.07] transition duration-300"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-3 md:mb-6">
                <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[var(--primary)]" />
              </div>

              <h3 className="text-sm sm:text-base md:text-2xl font-semibold leading-tight">
                {service.title}
              </h3>

              <p className="text-[11px] sm:text-xs md:text-base text-[var(--muted)] mt-2 md:mt-4 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}