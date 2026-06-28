"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
      .order("created_at", { ascending: false });

    if (!error) {
      setGallery(data || []);
    }

    setLoading(false);
  }

  return (
    <section className="py-14 md:py-32 relative overflow-hidden">

      <Container>

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
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
            Explore moments from our clinic, patient recovery journeys,
            rehabilitation sessions and performance training.
          </p>

        </motion.div>

        {/* Loading */}

        {loading && (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {Array.from({ length: 8 }).map((_, i) => (

              <div
                key={i}
                className="h-60 rounded-3xl bg-white/5 animate-pulse"
              />

            ))}

          </div>

        )}

        {/* Gallery */}

        {!loading && (

          <div
            className="
              columns-2
              md:columns-3
              lg:columns-4
              gap-6
              space-y-6
            "
          >

            {gallery.map((item, index) => (

              <motion.div

                key={item.id}

                onClick={() => setSelectedItem(item)}

                initial={{
                  opacity: 0,
                  y: 50,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: .6,
                  delay: index * .05,
                }}

                viewport={{
                  once: true,
                }}

                className="
                  mb-6
                  break-inside-avoid
                  overflow-hidden
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-white/5
                  backdrop-blur-xl
                  cursor-pointer
                  group
                  relative
                "

              >

                {item.type === "photo" ? (

                  <img
                    src={item.media_url}
                    alt={item.alt_text || item.title}
                    className="
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                  />

                ) : (

                  <video
                    src={item.media_url}
                    muted
                    playsInline
                    className="
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                  />

                )}

                {/* Hover Overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/40
                    opacity-0
                    group-hover:opacity-100
                    transition-all
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
                    {item.type === "photo"
                      ? "🔍 View Image"
                      : "▶ Play Video"}
                  </div>

                </div>

              </motion.div>

            ))}

          </div>

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