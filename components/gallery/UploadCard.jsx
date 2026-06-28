"use client";

import { useRef } from "react";

export default function UploadCard({
  title,
  type,
  accept,
  onSelect,
}) {
  const inputRef = useRef(null);

  return (
    <div className="border border-[var(--border)] bg-white/5 backdrop-blur-xl rounded-3xl p-6">

      <h2 className="text-2xl font-semibold mb-6">
        {title}
      </h2>

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-[var(--border)] rounded-2xl p-10 text-center cursor-pointer transition hover:border-[var(--primary)] hover:bg-white/5"
      >
        <div className="space-y-3">

          <div className="text-5xl">
            {type === "photo" ? "📷" : "🎥"}
          </div>

          <h3 className="text-xl font-semibold">
            Drag & Drop
          </h3>

          <p className="text-[var(--muted)]">
            or click to browse
          </p>

        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onSelect(e.target.files[0]);
            }
          }}
        />
      </div>

    </div>
  );
}