"use client";

import { useEffect, useState }
  from "react";

import { supabase }
  from "@/lib/supabase";

export default function AppointmentsPage() {

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    const { data } =
      await supabase
        .from("appointments")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    setAppointments(data || []);

    setLoading(false);
  };

  const updateStatus = async (
    id,
    status
  ) => {

    await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);

    fetchAppointments();
  };

  return (
    <div className="px-0 sm:px-0">

      {/* Heading */}
      <div className="mb-6 md:mb-12">

        <p className="text-[var(--primary)] uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm">
          Dashboard
        </p>

        <h1 className="text-2xl md:text-6xl font-bold mt-2 md:mt-4">
          Appointments
        </h1>

      </div>

      {/* Loading */}
      {loading && (
        <div className="text-[var(--muted)] text-sm md:text-base">
          Loading appointments...
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !appointments.length && (
          <div className="text-[var(--muted)] text-sm md:text-base">
            No appointments yet.
          </div>
        )}

      {/* Cards */}
      <div className="grid gap-3 md:gap-6">

        {appointments.map((item) => (

          <div
            key={item.id}
            className="border border-[var(--border)] bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8"
          >

            <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-6">

              <div className="min-w-0">

                <h2 className="text-lg md:text-2xl font-semibold wrap-break-words">
                  {item.full_name}
                </h2>

                <div className="mt-2 md:mt-4 space-y-0.5 md:space-y-2">

                  <p className="text-[var(--muted)] text-xs md:text-base break-all">
                    {item.email}
                  </p>

                  <p className="text-[var(--muted)] text-xs md:text-base">
                    {item.phone}
                  </p>

                </div>

              </div>

              <div className="flex flex-row md:flex-col justify-between md:justify-start gap-2 md:gap-4 md:items-end">

                <div
                  className={`inline-flex px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium ${item.status === "pending"
                      ? "bg-[var(--primary)]/5 text-[var(--primary)]"
                      : "bg-green-400/20 text-green-300"
                    }`}
                >
                  {item.status}
                </div>

                <div className="text-[var(--muted)] text-xs md:text-sm">
                  {item.appointment_date}
                </div>

              </div>

            </div>

            <div className="mt-4 md:mt-6 border-t border-[var(--border)] pt-4 md:pt-6">

              <p className="text-[var(--text)] text-sm md:text-base leading-relaxed wrap-break-words">
                {item.message}
              </p>

            </div>

            <div className="mt-4 md:mt-6 flex justify-stretch md:justify-end">

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "confirmed"
                  )
                }
                className="w-full md:w-auto border border-green-500/30 text-green-400 px-3 md:px-5 py-2 md:py-2 rounded-xl md:rounded-full hover:bg-green-500/10 transition text-sm md:text-base"
              >
                Confirm Appointment
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}