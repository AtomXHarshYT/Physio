"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import UploadCard from "@/components/gallery/UploadCard";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export default function GalleryPage() {

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {

    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setGallery(data || []);
  }

  async function uploadFile(file, type) {

    if (!file) return;

    const fileName =
      `${Date.now()}-${file.name}`;

    const filePath =
      `${type}s/${fileName}`;

    const { error: uploadError } =
      await supabase.storage
        .from("gallery")
        .upload(filePath, file);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("gallery")
      .getPublicUrl(filePath);

    const { error: dbError } =
      await supabase
        .from("gallery")
        .insert({
          title: file.name,
          type,
          media_url: publicUrl,
        });

    if (dbError) {
      alert(dbError.message);
      return;
    }

    fetchGallery();

    alert("Upload Successful 🎉");
  }

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <p className="gallery-breadcrumb">
          Dashboard
        </p>
        <h1 className="gallery-title">
          Gallery Manager
        </h1>
        <p className="gallery-subtitle">
          Upload and manage gallery photos & videos.
        </p>
      </div>

      <div className="upload-grid">
        <UploadCard
          title="Upload Photo"
          type="photo"
          accept="image/*"
          onSelect={(file) =>
            uploadFile(file, "photo")
          }
        />

        <UploadCard
          title="Upload Video"
          type="video"
          accept="video/*"
          onSelect={(file) =>
            uploadFile(file, "video")
          }
        />
      </div>

      <GalleryGrid
        gallery={gallery}
        refreshGallery={fetchGallery}
      />

      <style jsx>{`
        /* ============================================================
           DESKTOP STYLES (1024px+)
           These remain EXACTLY as they were - no changes
           ============================================================ */
        .gallery-page {
          /* Desktop - original spacing */
        }

        .gallery-header {
          margin-bottom: 3rem;
        }

        .gallery-breadcrumb {
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-size: 0.875rem;
        }

        .gallery-title {
          font-size: 3rem;
          font-weight: 700;
          margin-top: 1rem;
        }

        .gallery-subtitle {
          color: var(--muted);
          margin-top: 1rem;
        }

        .upload-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        /* ============================================================
           MOBILE OPTIMIZATION (< 1024px)
           Premium, compact, mobile-first design
           ============================================================ */
        @media screen and (max-width: 1023px) {
          .gallery-page {
            padding: 0 clamp(0.5rem, 2.5vw, 1.25rem);
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
            box-sizing: border-box;
          }

          .gallery-header {
            margin-bottom: clamp(1rem, 3vw, 1.75rem);
            padding-top: clamp(0.25rem, 1vw, 0.5rem);
          }

          .gallery-breadcrumb {
            font-size: clamp(0.563rem, 1vw, 0.688rem);
            letter-spacing: clamp(0.15em, 0.4vw, 0.25em);
            font-weight: 600;
          }

          .gallery-title {
            font-size: clamp(1.5rem, 4.5vw, 2rem);
            font-weight: 700;
            margin-top: clamp(0.375rem, 1.5vw, 0.625rem);
            letter-spacing: -0.02em;
            line-height: 1.2;
          }

          .gallery-subtitle {
            font-size: clamp(0.813rem, 1.4vw, 0.938rem);
            margin-top: clamp(0.25rem, 1vw, 0.5rem);
            line-height: 1.5;
            opacity: 0.8;
          }

          .upload-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: clamp(0.625rem, 1.75vw, 1rem);
            margin-bottom: clamp(1rem, 3vw, 1.75rem);
          }

          @media screen and (min-width: 640px) and (max-width: 1023px) {
            .upload-grid {
              grid-template-columns: 1fr 1fr;
              gap: clamp(0.75rem, 2vw, 1.25rem);
            }
          }

          @media screen and (max-width: 375px) {
            .gallery-page {
              padding: 0 0.5rem;
            }

            .gallery-title {
              font-size: 1.25rem;
              margin-top: 0.25rem;
            }

            .gallery-subtitle {
              font-size: 0.75rem;
              margin-top: 0.188rem;
            }

            .gallery-header {
              margin-bottom: 0.75rem;
            }

            .upload-grid {
              gap: 0.5rem;
            }
          }

          @media screen and (min-width: 376px) and (max-width: 414px) {
            .gallery-page {
              padding: 0 0.625rem;
            }

            .gallery-title {
              font-size: 1.375rem;
            }

            .upload-grid {
              gap: 0.625rem;
            }
          }

          @media screen and (min-width: 415px) and (max-width: 639px) {
            .gallery-page {
              padding: 0 0.75rem;
            }

            .gallery-title {
              font-size: 1.625rem;
            }

            .upload-grid {
              gap: 0.75rem;
            }
          }

          @media screen and (min-width: 640px) and (max-width: 1023px) {
            .gallery-page {
              padding: 0 clamp(0.75rem, 2vw, 1.25rem);
            }

            .gallery-title {
              font-size: clamp(1.75rem, 4vw, 2.25rem);
            }

            .gallery-subtitle {
              font-size: clamp(0.875rem, 1.2vw, 1rem);
            }

            .gallery-header {
              margin-bottom: clamp(1.25rem, 2.5vw, 2rem);
            }
          }

          /* ============================================================
             PREVENT HORIZONTAL SCROLLING
             ============================================================ */
          *,
          *::before,
          *::after {
            max-width: 100%;
            box-sizing: border-box;
          }

          img,
          video,
          iframe,
          embed,
          object {
            max-width: 100%;
            height: auto;
            display: block;
          }

          /* ============================================================
             PERFORMANCE & SMOOTH SCROLLING
             ============================================================ */
          @media screen and (max-width: 1023px) {
            html {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
            }

            .gallery-page {
              -webkit-overflow-scrolling: touch;
            }
          }
        }
      `}</style>
    </div>
  );
}