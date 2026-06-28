"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function DashboardPage() {

  const [consultations, setConsultations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {

    const { data } =
      await supabase
        .from("consultations")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    setConsultations(data || []);

    setLoading(false);
  };

  const updateStatus = async (
    id,
    status
  ) => {

    await supabase
      .from("consultations")
      .update({ status })
      .eq("id", id);

    fetchConsultations();
  };

  const deleteConsultation = async (id) => {

    const confirmDelete =
      confirm("Delete consultation?");

    if (!confirmDelete) return;

    await supabase
      .from("consultations")
      .delete()
      .eq("id", id);

    fetchConsultations();
  };

  return (
    <div>

      {/* Heading */}
      <div className="mb-6 md:mb-12">

        <p className="text-[var(--primary)] uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm">
          Dashboard
        </p>

        <h1 className="text-2xl md:text-6xl font-bold mt-2 md:mt-4">
          Consultation Submissions
        </h1>

      </div>

      {/* Loading */}
      {loading && (
        <div className="text-[var(--muted)] text-sm md:text-base">
          Loading consultations...
        </div>
      )}

      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-3 gap-2 md:gap-6 mb-6 md:mb-10">

          <div className="border border-[var(--border)] bg-white/5 rounded-2xl md:rounded-3xl p-3 md:p-6">

            <p className="text-[var(--muted)] text-xs md:text-base">
              Total
            </p>

            <h2 className="text-xl md:text-5xl font-bold mt-1 md:mt-4 text-[var(--primary)]">
              {consultations.length}
            </h2>

          </div>

          <div className="border border-[var(--border)] bg-white/5 rounded-2xl md:rounded-3xl p-3 md:p-6">

            <p className="text-[var(--muted)] text-xs md:text-base">
              New Leads
            </p>

            <h2 className="text-xl md:text-5xl font-bold mt-1 md:mt-4 text-[var(--accent)]">

              {
                consultations.filter(
                  (item) => item.status === "new"
                ).length
              }

            </h2>

          </div>

          <div className="border border-[var(--border)] bg-white/5 rounded-2xl md:rounded-3xl p-3 md:p-6">

            <p className="text-[var(--muted)] text-xs md:text-base">
              Completed
            </p>

            <h2 className="text-xl md:text-5xl font-bold mt-1 md:mt-4 text-green-400">

              {
                consultations.filter(
                  (item) =>
                    item.status === "completed"
                ).length
              }

            </h2>

          </div>

        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-10">

        {[
          "all",
          "new",
          "contacted",
          "completed",
        ].map((item) => (

          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full border transition text-xs md:text-sm ${
              filter === item
                ? "bg-[var(--primary)] text-[var(--background)] border-[var(--primary)]"
                : "border-[var(--border)] text-[var(--text)] hover:bg-white/10"
            }`}
          >
            {item}
          </button>

        ))}

      </div>

      {/* Cards */}
      <div className="grid gap-3 md:gap-6">

        {consultations
          .filter((item) =>
            filter === "all"
              ? true
              : item.status === filter
          )
          .map((item) => (

          <div
            key={item.id}
            className="border border-[var(--border)] bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8"
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">

              <div>

                <h2 className="text-lg md:text-2xl font-semibold">
                  {item.full_name}
                </h2>

                <div className="mt-2 md:mt-3 space-y-0.5 md:space-y-1">

                  <p className="text-[var(--muted)] text-xs md:text-base break-all">
                    {item.email}
                  </p>

                  <p className="text-[var(--muted)] text-xs md:text-base">
                    {item.phone}
                  </p>

                </div>

              </div>

              <div className="flex flex-row md:flex-col items-center justify-between md:items-end gap-3 md:gap-4">

                <div
                  className={`inline-flex px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium ${
                    item.status === "new"
                      ? "bg-[var(--primary)]/5 text-[var(--primary)]"
                      : item.status === "contacted"
                      ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                      : "bg-green-400/20 text-green-300"
                  }`}
                >
                  {item.status}
                </div>

                <div className="text-xs md:text-sm text-[var(--muted)]">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </div>

              </div>

            </div>

            <div className="mt-4 md:mt-6 border-t border-[var(--border)] pt-4 md:pt-6">

              <p className="text-[var(--text)] text-sm md:text-base leading-relaxed wrap-break-words">
                {item.goals}
              </p>

            </div>

            <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-4 justify-end">

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "contacted"
                  )
                }
                className="border border-[var(--accent)]/30 text-[var(--accent)] px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-[var(--accent)]/10 transition text-xs md:text-sm"
              >
                Mark Contacted
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "completed"
                  )
                }
                className="border border-green-500/30 text-green-400 px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-green-500/10 transition text-xs md:text-sm"
              >
                Complete
              </button>

              <button
                onClick={() =>
                  deleteConsultation(item.id)
                }
                className="border border-red-500/30 text-red-400 px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-red-500/10 transition text-xs md:text-sm"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}