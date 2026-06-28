"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryModal({
  item,
  onClose,
}) {
  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 md:top-8 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white text-3xl transition"
          >
            ×
          </button>

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full flex items-center justify-center"
          >
            {item.type === "photo" ? (
              <img
                src={item.media_url}
                alt={item.alt_text || item.title}
                className="max-h-[90vh] w-auto rounded-3xl object-contain shadow-2xl"
              />
            ) : (
              <video
                src={item.media_url}
                controls
                autoPlay
                playsInline
                className="max-h-[90vh] w-full rounded-3xl shadow-2xl"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}