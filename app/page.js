"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Services from "@/components/sections/Services";
import Performance from "@/components/sections/Performance";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Packages from "@/components/sections/Packages";
import Consultation from "@/components/sections/Consultation";
import PageTransition from "@/components/animations/PageTransition";
import Button from "@/components/ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen text-[var(--text)] relative overflow-hidden">

        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden flex items-center pt-28 md:pt-32 lg:pt-36">
          {/* Video Slider Background */}
          <div className="absolute inset-0 z-0">

            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="w-full h-full"
            >

              <SwiperSlide>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover md:object-center object-[40%_center] scale-105 animate-slowZoom"
                >
                  <source
                    src="/videos/hero1.mp4"
                    type="video/mp4"
                  />
                </video>
              </SwiperSlide>

              <SwiperSlide>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover md:object-center object-[40%_center] scale-105 animate-slowZoom"
                >
                  <source
                    src="/videos/hero2.mp4"
                    type="video/mp4"
                  />
                </video>
              </SwiperSlide>

              <SwiperSlide>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover scale-105 animate-slowZoom  "
                >
                  <source
                    src="/videos/hero3.mp4"
                    type="video/mp4"
                  />
                </video>
              </SwiperSlide>

            </Swiper>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10" />

          </div>
          <Container className="relative z-20">

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[var(--primary)] uppercase tracking-[0.3em] text-sm mb-6"
            >
              Elite Recovery & Performance
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl"
            >
              Transform Your Body With Futuristic Physiotherapy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-[var(--muted)] text-lg mt-8 max-w-2xl leading-relaxed"
            >
              Premium sports rehab, mobility coaching, injury recovery,
              and performance optimization built for modern athletes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <a href="#consultation">
                <Button>
                  Start Consultation
                </Button>
              </a>
              <a href="#services">
                <Button variant="secondary">
                  Explore Services
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-14 md:mt-20"
            >

              <div className="border border-[var(--border)] bg-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8 mb-16 md:mb-24">
                <h2 className="text-2xl md:text-4xl font-bold text-[var(--primary)]">
                  500+
                </h2>

                <p className="text-[var(--muted)] text-sm md:text-base mt-1 md:mt-2">
                  Successful Recoveries
                </p>
              </div>

              <div className="border border-[var(--border)] bg-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8 mb-16 md:mb-24">
                <h2 className="text-2xl md:text-4xl font-bold text-[var(--accent)]">
                  4+
                </h2>

                <p className="text-[var(--muted)] text-sm md:text-base mt-1 md:mt-2">
                  Years Experience
                </p>
              </div>
            </motion.div>

          </Container>
        </section>
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Performance />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Gallery />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <Packages />
        <div className="section-divider" />
        <Consultation />
      </main>
    </PageTransition >
  );
}