"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ServicesPage() {
  const emptyForm = {
    title: "",
    description: "",
    display_order: 0,
  };

  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  async function fetchServices() {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    setServices(data || []);
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      display_order: Number(form.display_order),
    };

    if (editingId) {
      await supabase
        .from("services")
        .update(payload)
        .eq("id", editingId);

      setEditingId(null);
    } else {
      await supabase
        .from("services")
        .insert([payload]);
    }

    setForm(emptyForm);
    fetchServices();
  }

  async function deleteService(id) {
    await supabase
      .from("services")
      .delete()
      .eq("id", id);

    fetchServices();
  }

  function editService(item) {
    setEditingId(item.id);

    setForm({
      title: item.title,
      description: item.description,
      display_order: item.display_order,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="services-page">
      <h1 className="services-title">
        Services
      </h1>

      <form
        onSubmit={handleSubmit}
        className="services-form"
      >
        <input
          type="text"
          placeholder="Service Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="services-input"
          required
        />

        <textarea
          rows={5}
          placeholder="Service Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="services-textarea"
          required
        />

        <input
          type="number"
          placeholder="Display Order"
          value={form.display_order}
          onChange={(e) =>
            setForm({
              ...form,
              display_order: e.target.value,
            })
          }
          className="services-input"
        />

        <button
          type="submit"
          className="services-submit-btn"
        >
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      <div className="services-grid">
        {services.map((item) => (
          <div
            key={item.id}
            className="service-card"
          >
            <h2 className="service-title">
              {item.title}
            </h2>

            <p className="service-description">
              {item.description}
            </p>

            <div className="service-order">
              <span className="service-order-text">
                Order: {item.display_order}
              </span>
            </div>

            <div className="service-actions">
              <button
                onClick={() => editService(item)}
                className="service-edit-btn"
              >
                Edit
              </button>

              <button
                onClick={() => deleteService(item.id)}
                className="service-delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="services-empty">
          No services found.
        </div>
      )}

      <style jsx>{`
        /* ============================================================
           DESKTOP STYLES (1024px+)
           These remain EXACTLY as they were - no changes
           ============================================================ */
        .services-page {
          /* Desktop - original spacing */
        }

        .services-title {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .services-form {
          space-y: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .services-input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.75rem;
          background-color: var(--secondary);
          font-size: 1rem;
          border: none;
          outline: none;
          box-sizing: border-box;
        }

        .services-textarea {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.75rem;
          background-color: var(--secondary);
          font-size: 1rem;
          border: none;
          outline: none;
          resize: none;
          box-sizing: border-box;
        }

        .services-submit-btn {
          background-color: var(--primary);
          color: var(--background);
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
          font-size: 1rem;
        }

        .services-submit-btn:hover {
          opacity: 0.9;
        }

        .services-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr 1fr;
        }

        .service-card {
          background-color: var(--secondary);
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
        }

        .service-description {
          color: var(--muted);
          margin-top: 0.75rem;
          line-height: 1.625;
        }

        .service-order {
          margin-top: 1rem;
        }

        .service-order-text {
          font-size: 0.875rem;
          color: var(--primary);
        }

        .service-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .service-edit-btn {
          background-color: #3b82f6;
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          font-size: 1rem;
        }

        .service-edit-btn:hover {
          background-color: #2563eb;
        }

        .service-delete-btn {
          background-color: #ef4444;
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          font-size: 1rem;
        }

        .service-delete-btn:hover {
          background-color: #dc2626;
        }

        .services-empty {
          text-align: center;
          padding: 3rem 0;
          color: var(--muted);
        }

        /* ============================================================
           MOBILE OPTIMIZATION (< 1024px)
           Premium, compact, mobile-first design
           ============================================================ */
        @media screen and (max-width: 1023px) {
          .services-page {
            padding: 0 clamp(0.5rem, 2.5vw, 1.25rem);
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
            box-sizing: border-box;
          }

          .services-title {
            font-size: clamp(1.25rem, 3.5vw, 1.625rem);
            font-weight: 700;
            margin-bottom: clamp(0.75rem, 2.5vw, 1.25rem);
            letter-spacing: -0.02em;
          }

          .services-form {
            display: flex;
            flex-direction: column;
            gap: clamp(0.5rem, 1.25vw, 0.75rem);
            margin-bottom: clamp(1.25rem, 3vw, 1.75rem);
          }

          .services-input {
            padding: clamp(0.5rem, 1.25vw, 0.625rem);
            font-size: clamp(0.813rem, 1.4vw, 0.875rem);
            border-radius: clamp(0.5rem, 1.25vw, 0.625rem);
            min-height: 44px;
            -webkit-appearance: none;
            background-color: var(--secondary);
            border: 1px solid transparent;
            transition: border-color 0.2s;
          }

          .services-input:focus {
            border-color: var(--primary);
            outline: none;
          }

          .services-textarea {
            padding: clamp(0.5rem, 1.25vw, 0.625rem);
            font-size: clamp(0.813rem, 1.4vw, 0.875rem);
            border-radius: clamp(0.5rem, 1.25vw, 0.625rem);
            min-height: 100px;
            background-color: var(--secondary);
            border: 1px solid transparent;
            transition: border-color 0.2s;
            resize: vertical;
          }

          .services-textarea:focus {
            border-color: var(--primary);
            outline: none;
          }

          .services-submit-btn {
            padding: clamp(0.5rem, 1.25vw, 0.625rem) clamp(0.75rem, 2vw, 1rem);
            font-size: clamp(0.813rem, 1.4vw, 0.875rem);
            min-height: 48px;
            width: 100%;
            border-radius: clamp(0.5rem, 1.25vw, 0.625rem);
            font-weight: 600;
            letter-spacing: 0.01em;
            transition: all 0.2s;
          }

          .services-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: clamp(0.625rem, 1.75vw, 0.875rem);
          }

          /* Tablet: 2 columns */
          @media screen and (min-width: 640px) and (max-width: 1023px) {
            .services-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: clamp(0.75rem, 1.5vw, 1rem);
            }
          }

          .service-card {
            padding: clamp(0.75rem, 2vw, 1.125rem);
            border-radius: clamp(0.625rem, 1.5vw, 0.75rem);
            background-color: var(--secondary);
            transition: transform 0.2s;
          }

          .service-card:active {
            transform: scale(0.98);
          }

          .service-title {
            font-size: clamp(0.938rem, 2.25vw, 1.063rem);
            font-weight: 700;
            margin: 0;
            line-height: 1.3;
            letter-spacing: -0.01em;
          }

          .service-description {
            font-size: clamp(0.813rem, 1.4vw, 0.875rem);
            margin-top: clamp(0.375rem, 1.25vw, 0.5rem);
            line-height: 1.5;
            color: var(--muted);
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .service-order {
            margin-top: clamp(0.5rem, 1.5vw, 0.75rem);
          }

          .service-order-text {
            font-size: clamp(0.688rem, 1.2vw, 0.75rem);
            color: var(--primary);
            font-weight: 500;
          }

          .service-actions {
            display: flex;
            gap: clamp(0.375rem, 1vw, 0.5rem);
            margin-top: clamp(0.75rem, 2vw, 1rem);
            flex-wrap: wrap;
          }

          .service-edit-btn,
          .service-delete-btn {
            padding: clamp(0.375rem, 1vw, 0.5rem) clamp(0.625rem, 1.5vw, 0.875rem);
            font-size: clamp(0.75rem, 1.2vw, 0.813rem);
            min-height: 44px;
            flex: 1;
            min-width: 60px;
            border-radius: clamp(0.375rem, 1vw, 0.5rem);
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .service-edit-btn {
            background-color: #3b82f6;
            color: white;
          }

          .service-edit-btn:active {
            transform: scale(0.95);
          }

          .service-delete-btn {
            background-color: #ef4444;
            color: white;
          }

          .service-delete-btn:active {
            transform: scale(0.95);
          }

          .services-empty {
            text-align: center;
            padding: clamp(1.5rem, 4vw, 2.5rem) 0;
            color: var(--muted);
            font-size: clamp(0.813rem, 1.2vw, 0.875rem);
          }

          /* Extra small screens - ultra compact */
          @media screen and (max-width: 375px) {
            .services-page {
              padding: 0 0.5rem;
            }

            .services-title {
              font-size: 1.125rem;
              margin-bottom: 0.5rem;
            }

            .services-form {
              gap: 0.375rem;
              margin-bottom: 0.75rem;
            }

            .services-input {
              padding: 0.438rem 0.625rem;
              font-size: 0.75rem;
              min-height: 40px;
            }

            .services-textarea {
              padding: 0.438rem 0.625rem;
              font-size: 0.75rem;
              min-height: 80px;
            }

            .services-submit-btn {
              font-size: 0.75rem;
              padding: 0.438rem 0.625rem;
              min-height: 40px;
            }

            .service-card {
              padding: 0.625rem;
            }

            .service-title {
              font-size: 0.875rem;
            }

            .service-description {
              font-size: 0.75rem;
              margin-top: 0.25rem;
              -webkit-line-clamp: 2;
            }

            .service-edit-btn,
            .service-delete-btn {
              font-size: 0.688rem;
              padding: 0.313rem 0.5rem;
              min-height: 36px;
              min-width: 50px;
            }

            .service-actions {
              gap: 0.313rem;
              margin-top: 0.5rem;
            }
          }

          /* Small phones */
          @media screen and (min-width: 376px) and (max-width: 414px) {
            .services-page {
              padding: 0 0.625rem;
            }

            .services-title {
              font-size: 1.25rem;
            }

            .service-card {
              padding: 0.688rem;
            }
          }

          /* Touch target enhancements */
          @media (pointer: coarse) {
            .services-input,
            .services-textarea,
            .services-submit-btn,
            .service-edit-btn,
            .service-delete-btn {
              min-height: 44px;
            }
          }

          /* Prevent horizontal scrolling */
          .services-page,
          .services-grid,
          .service-card {
            max-width: 100%;
            box-sizing: border-box;
          }

          /* Performance optimizations */
          .service-card {
            transform: translateZ(0);
            backface-visibility: hidden;
            will-change: transform;
          }

          /* Smooth animations */
          .service-card,
          .service-edit-btn,
          .service-delete-btn,
          .services-submit-btn {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      `}</style>
    </div>
  );
}