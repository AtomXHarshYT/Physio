"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    review: "",
    rating: 5,
  });

  async function fetchTestimonials() {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("id", { ascending: false });

    setTestimonials(data || []);
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      await supabase
        .from("testimonials")
        .update(form)
        .eq("id", editingId);

      setEditingId(null);
    } else {
      await supabase
        .from("testimonials")
        .insert([form]);
    }

    setForm({
      name: "",
      role: "",
      review: "",
      rating: 5,
    });

    fetchTestimonials();
  }

  async function deleteTestimonial(id) {
    await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    fetchTestimonials();
  }

  function editTestimonial(item) {
    setEditingId(item.id);

    setForm({
      name: item.name,
      role: item.role,
      review: item.review,
      rating: item.rating || 5,
    });
  }

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Testimonials
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 sm:space-y-4 mb-8 sm:mb-10"
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="w-full p-2.5 sm:p-3 rounded bg-[var(--secondary)] text-sm sm:text-base"
          required
        />

        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
          className="w-full p-2.5 sm:p-3 rounded bg-[var(--secondary)] text-sm sm:text-base"
          required
        />

        <textarea
          placeholder="Review"
          value={form.review}
          onChange={(e) =>
            setForm({
              ...form,
              review: e.target.value,
            })
          }
          className="w-full p-2.5 sm:p-3 rounded bg-[var(--secondary)] text-sm sm:text-base min-h-[100px] sm:min-h-[120px]"
          required
        />

        <select
          value={form.rating}
          onChange={(e) =>
            setForm({
              ...form,
              rating: Number(e.target.value),
            })
          }
          className="w-full p-2.5 sm:p-3 rounded bg-[var(--secondary)] text-sm sm:text-base"
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>

        <button
          type="submit"
          className="w-full sm:w-auto bg-[var(--primary)] text-[var(--background)] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
        >
          {editingId
            ? "Update Testimonial"
            : "Add Testimonial"}
        </button>
      </form>

      <div className="space-y-3 sm:space-y-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-2xl bg-[var(--secondary)]"
          >
            <div className="text-[var(--primary)] text-base sm:text-lg">
              {"★".repeat(item.rating || 5)}
            </div>

            <h3 className="font-bold mt-2 text-sm sm:text-base">
              {item.name}
            </h3>

            <p className="text-[var(--muted)] text-xs sm:text-sm">
              {item.role}
            </p>

            <p className="mt-2 text-sm sm:text-base">
              {item.review}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
              <button
                onClick={() =>
                  editTestimonial(item)
                }
                className="w-full sm:w-auto bg-blue-500 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteTestimonial(item.id)
                }
                className="w-full sm:w-auto bg-red-500 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium"
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