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
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Testimonials
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-10"
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
          className="w-full p-3 rounded bg-zinc-900"
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
          className="w-full p-3 rounded bg-zinc-900"
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
          className="w-full p-3 rounded bg-zinc-900"
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
          className="w-full p-3 rounded bg-zinc-900"
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>

        <button
          type="submit"
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold"
        >
          {editingId
            ? "Update Testimonial"
            : "Add Testimonial"}
        </button>
      </form>

      <div className="space-y-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-zinc-900"
          >
            <div className="text-yellow-400 text-lg">
              {"★".repeat(item.rating || 5)}
            </div>

            <h3 className="font-bold mt-2">
              {item.name}
            </h3>

            <p className="text-zinc-400">
              {item.role}
            </p>

            <p className="mt-2">
              {item.review}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() =>
                  editTestimonial(item)
                }
                className="bg-blue-500 px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteTestimonial(item.id)
                }
                className="bg-red-500 px-4 py-2 rounded-lg"
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