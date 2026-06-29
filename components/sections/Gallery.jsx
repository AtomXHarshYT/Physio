"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { supabase } from "@/lib/supabase";
import Container from "@/components/ui/Container";
import GalleryModal from "@/components/gallery/GalleryModal";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("is_active", true)
      .order("created_at", {
        ascending: false,
      });

    if (!error) {
      setGallery(data || []);
    }

    setLoading(false);
  }

  const photos = gallery.filter(
    (item) => item.type === "photo"
  );

  const videos = gallery.filter(
    (item) => item.type === "video"
  );

  return (
    <section className="py-16 md:py-32 overflow-hidden">

      <Container>

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <p className="text-[var(--primary)] uppercase tracking-[0.3em] text-xs md:text-sm">
            Gallery
          </p>

          <h2 className="text-3xl md:text-6xl font-bold mt-5">
            Real Recovery.
            <br />
            Real Results.
          </h2>

          <p className="text-[var(--muted)] max-w-2xl mx-auto mt-6 leading-relaxed">
            Explore moments from our clinic,
            rehabilitation sessions,
            mobility training and
            performance transformations.
          </p>

        </motion.div>

        {loading ? (

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {Array.from({ length: 8 }).map((_, i) => (

              <div
                key={i}
                className="aspect-video rounded-3xl bg-white/5 animate-pulse"
              />

            ))}

          </div>

        ) : (

          <>

            {/* ========================== */}
            {/* PHOTOS */}
            {/* ========================== */}

            <div className="mb-12">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--primary)]/80 to-transparent mb-8" />
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={24}
                speed={7000}
                loop={photos.length > 4}
                allowTouchMove
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="!overflow-visible"
              >

                {photos.map((item) => (

                  <SwiperSlide
                    key={item.id}
                    className="!w-[180px] md:!w-[360px]"
                  >

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedItem(item)}
                      className="
                        aspect-video
                        rounded-3xl
                        overflow-hidden
                        border
                        border-[var(--border)]
                        bg-white/5
                        backdrop-blur-xl
                        cursor-pointer
                        group
                        relative
                      "
                    >

                      <img
                        src={item.media_url}
                        alt={item.alt_text || item.title}
                        className="
                          w-full
                          h-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-black/40
                          opacity-0
                          group-hover:opacity-100
                          transition
                          duration-300
                          flex
                          items-center
                          justify-center
                        "
                      >

                        <div
                          className="
                            px-6
                            py-3
                            rounded-full
                            bg-white/10
                            backdrop-blur-xl
                            border
                            border-white/20
                            text-white
                            font-medium
                          "
                        >
                          🔍 View Image
                        </div>

                      </div>

                    </motion.div>

                  </SwiperSlide>

                ))}

              </Swiper>

            </div>
            {/* ========================== */}
            {/* VIDEOS */}
            {/* ========================== */}

            <div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)]/80 to-transparent mb-8" />

              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={24}
                speed={7000}
                loop={videos.length > 4}
                allowTouchMove
                autoplay={{
                  delay: 0,
                  reverseDirection: true,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="!overflow-visible"
              >

                {videos.map((item) => (

                  <SwiperSlide
                    key={item.id}
                    className="!w-[180px] md:!w-[360px]"
                  >

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedItem(item)}
                      className="
                        aspect-video
                        rounded-3xl
                        overflow-hidden
                        border
                        border-[var(--border)]
                        bg-white/5
                        backdrop-blur-xl
                        cursor-pointer
                        group
                        relative
                      "
                    >

                      <video
                        src={item.media_url}
                        muted
                        playsInline
                        preload="metadata"
                        className="
                          w-full
                          h-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-black/40
                          opacity-0
                          group-hover:opacity-100
                          transition
                          duration-300
                          flex
                          items-center
                          justify-center
                        "
                      >

                        <div
                          className="
                            px-6
                            py-3
                            rounded-full
                            bg-white/10
                            backdrop-blur-xl
                            border
                            border-white/20
                            text-white
                            font-medium
                          "
                        >
                          ▶ Play Video
                        </div>

                      </div>

                    </motion.div>

                  </SwiperSlide>

                ))}

              </Swiper>

            </div>

          </>

        )}
      </Container>

      {selectedItem && (
        <GalleryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

    </section>
  );
}