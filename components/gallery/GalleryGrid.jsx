"use client";

import { supabase } from "@/lib/supabase";

export default function GalleryGrid({
  gallery,
  refreshGallery,
}) {

  async function deleteMedia(item) {

    const confirmDelete =
      confirm("Delete this media?");

    if (!confirmDelete) return;

    const filePath =
      item.media_url.split("/gallery/")[1];

    const { error: storageError } =
      await supabase.storage
        .from("gallery")
        .remove([filePath]);

    if (storageError) {
      alert(storageError.message);
      return;
    }

    const { error: dbError } =
      await supabase
        .from("gallery")
        .delete()
        .eq("id", item.id);

    if (dbError) {
      alert(dbError.message);
      return;
    }

    refreshGallery();
  }

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-heading">Gallery</h2>
        <span className="gallery-count">{gallery.length} items</span>
      </div>

      {gallery.length === 0 && (
        <div className="gallery-empty">
          <p className="gallery-empty-text">
            No media uploaded yet.
          </p>
        </div>
      )}

      <div className="gallery-grid">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="gallery-item"
          >
            {item.type === "photo" ? (
              <img
                src={item.media_url}
                alt={item.title}
                className="gallery-media"
                loading="lazy"
              />
            ) : (
              <video
                src={item.media_url}
                muted
                controls
                className="gallery-media"
                playsInline
                preload="metadata"
              />
            )}

            <div className="gallery-item-overlay">
              <button
                onClick={() => deleteMedia(item)}
                className="gallery-delete-btn"
                aria-label="Delete media"
              >
                <svg className="delete-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* ============================================================
           DESKTOP STYLES (1024px+)
           ============================================================ */
        .gallery-section {
          margin-top: 4rem;
        }

        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .gallery-heading {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 0;
        }

        .gallery-count {
          color: var(--muted);
          font-size: 0.875rem;
        }

        .gallery-empty {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1.5rem;
          padding: 2.5rem;
          text-align: center;
        }

        .gallery-empty-text {
          color: var(--muted);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        @media screen and (max-width: 1280px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media screen and (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .gallery-item {
          position: relative;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          transition: transform 0.2s;
        }

        .gallery-item:hover {
          transform: scale(1.02);
        }

        .gallery-item:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gallery-item-overlay {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0.75rem;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .gallery-delete-btn {
          background: rgba(239, 68, 68, 0.9);
          color: white;
          border: none;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
        }

        .gallery-delete-btn:hover {
          background: #ef4444;
          transform: scale(1.1);
        }

        .delete-icon {
          width: 18px;
          height: 18px;
        }

        /* ============================================================
           MOBILE OPTIMIZATION (< 1024px)
           Compact grid with 4-5 items per row on mobile
           ============================================================ */
        @media screen and (max-width: 1023px) {
          .gallery-section {
            margin-top: clamp(1.5rem, 4vw, 2.5rem);
            padding: 0 clamp(0.5rem, 2.5vw, 1.25rem);
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }

          .gallery-header {
            margin-bottom: clamp(0.75rem, 2vw, 1.25rem);
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .gallery-heading {
            font-size: clamp(1.25rem, 3.5vw, 1.625rem);
            font-weight: 700;
            letter-spacing: -0.02em;
          }

          .gallery-count {
            font-size: clamp(0.75rem, 1.2vw, 0.875rem);
          }

          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: clamp(0.25rem, 0.75vw, 0.5rem);
          }

          /* For very small screens, show 4 items per row */
          @media screen and (max-width: 480px) {
            .gallery-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: clamp(0.188rem, 0.5vw, 0.313rem);
            }
          }

          /* For medium screens, show 4-5 items per row */
          @media screen and (min-width: 481px) and (max-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: clamp(0.313rem, 0.75vw, 0.5rem);
            }
          }

          /* For tablets, show more items per row */
          @media screen and (min-width: 769px) and (max-width: 1023px) {
            .gallery-grid {
              grid-template-columns: repeat(5, 1fr);
              gap: clamp(0.5rem, 1vw, 0.75rem);
            }
          }

          .gallery-item {
            border-radius: clamp(0.375rem, 1vw, 0.625rem);
            border: 1px solid var(--border);
            aspect-ratio: 1 / 1;
            -webkit-tap-highlight-color: transparent;
            transition: transform 0.2s;
          }

          .gallery-item:active {
            transform: scale(0.95);
          }

          .gallery-media {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          /* Always show delete button on mobile for better UX */
          .gallery-item-overlay {
            position: absolute;
            top: 0;
            right: 0;
            padding: clamp(0.188rem, 0.5vw, 0.375rem);
            opacity: 1;
            transition: opacity 0.2s;
          }

          .gallery-delete-btn {
            background: rgba(239, 68, 68, 0.85);
            padding: clamp(0.188rem, 0.5vw, 0.313rem);
            width: clamp(24px, 4vw, 32px);
            height: clamp(24px, 4vw, 32px);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            backdrop-filter: blur(4px);
          }

          .gallery-delete-btn:active {
            transform: scale(0.9);
          }

          .delete-icon {
            width: clamp(12px, 2vw, 16px);
            height: clamp(12px, 2vw, 16px);
            stroke-width: 2.5;
          }

          .gallery-empty {
            border-radius: clamp(0.75rem, 1.5vw, 1rem);
            padding: clamp(1.5rem, 4vw, 2.5rem);
          }

          .gallery-empty-text {
            font-size: clamp(0.813rem, 1.4vw, 0.938rem);
          }

          /* Extra small screens - even more compact */
          @media screen and (max-width: 375px) {
            .gallery-section {
              padding: 0 0.375rem;
              margin-top: 1rem;
            }

            .gallery-grid {
              gap: 0.188rem;
            }

            .gallery-heading {
              font-size: 1.125rem;
            }

            .gallery-count {
              font-size: 0.688rem;
            }

            .gallery-delete-btn {
              width: 20px;
              height: 20px;
              padding: 0.125rem;
            }

            .delete-icon {
              width: 10px;
              height: 10px;
            }

            .gallery-item-overlay {
              padding: 0.125rem;
            }
          }

          /* Touch target enhancement - delete button still touchable */
          @media (pointer: coarse) {
            .gallery-delete-btn {
              min-width: 32px;
              min-height: 32px;
            }
          }

          /* Prevent horizontal scrolling */
          .gallery-section,
          .gallery-grid,
          .gallery-item,
          .gallery-media {
            max-width: 100%;
            box-sizing: border-box;
          }

          img,
          video {
            max-width: 100%;
            height: auto;
          }

          /* Performance optimizations */
          .gallery-item {
            transform: translateZ(0);
            backface-visibility: hidden;
            will-change: transform;
          }

          /* Remove title and type text on mobile for cleaner grid */
          .gallery-item-title,
          .gallery-item-type {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}