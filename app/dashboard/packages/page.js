"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PackagesPage() {
    const emptyForm = {
        title: "",
        price: "",
        feature1: "",
        feature2: "",
        feature3: "",
        feature4: "",
        featured: false,
    };

    const [packages, setPackages] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);

    async function fetchPackages() {
        const { data } = await supabase
            .from("packages")
            .select("*")
            .order("id", { ascending: false });

        setPackages(data || []);
    }

    useEffect(() => {
        fetchPackages();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            title: form.title,
            price: form.price,
            featured: form.featured,
            features: [
                form.feature1,
                form.feature2,
                form.feature3,
                form.feature4,
            ].filter((item) => item.trim() !== ""),
        };

        if (editingId) {
            await supabase
                .from("packages")
                .update(payload)
                .eq("id", editingId);

            setEditingId(null);
        } else {
            await supabase
                .from("packages")
                .insert([payload]);
        }

        setForm(emptyForm);
        fetchPackages();
    }

    async function deletePackage(id) {
        await supabase
            .from("packages")
            .delete()
            .eq("id", id);

        fetchPackages();
    }

    function editPackage(item) {
        setEditingId(item.id);

        setForm({
            title: item.title,
            price: item.price,
            feature1: item.features?.[0] || "",
            feature2: item.features?.[1] || "",
            feature3: item.features?.[2] || "",
            feature4: item.features?.[3] || "",
            featured: item.featured || false,
        });
    }

    return (
        <div className="packages-page">
            <h1 className="page-title">Packages</h1>

            <form onSubmit={handleSubmit} className="package-form">
                <input
                    type="text"
                    placeholder="Package Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            title: e.target.value,
                        })
                    }
                    className="form-input"
                    required
                />

                <input
                    type="text"
                    placeholder="Package Price"
                    value={form.price}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            price: e.target.value,
                        })
                    }
                    className="form-input"
                    required
                />

                <div className="features-grid">
                    <input
                        type="text"
                        placeholder="Feature 1"
                        value={form.feature1}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                feature1: e.target.value,
                            })
                        }
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Feature 2"
                        value={form.feature2}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                feature2: e.target.value,
                            })
                        }
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Feature 3"
                        value={form.feature3}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                feature3: e.target.value,
                            })
                        }
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Feature 4"
                        value={form.feature4}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                feature4: e.target.value,
                            })
                        }
                        className="form-input"
                        required
                    />
                </div>

                <label className="featured-label">
                    <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                featured: e.target.checked,
                            })
                        }
                        className="featured-checkbox"
                    />
                    <span className="featured-text">Featured Package</span>
                </label>

                <button type="submit" className="submit-btn">
                    {editingId ? "Update Package" : "Add Package"}
                </button>
            </form>

            <div className="packages-grid">
                {packages.map((item) => (
                    <div key={item.id} className="package-card">
                        <div className="card-header">
                            <div className="card-title-group">
                                <h2 className="card-title">{item.title}</h2>
                                <p className="card-price">{item.price}</p>
                            </div>
                            {item.featured && (
                                <span className="featured-badge">Featured</span>
                            )}
                        </div>

                        <ul className="features-list">
                            {(item.features || []).map((feature, index) => (
                                <li key={index} className="feature-item">
                                    <span className="check-mark">✓</span>
                                    <span className="feature-text">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="card-actions">
                            <button
                                onClick={() => editPackage(item)}
                                className="edit-btn"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deletePackage(item.id)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {packages.length === 0 && (
                <div className="empty-state">No packages found.</div>
            )}

            <style jsx>{`
                /* ============================================================
                   DESKTOP STYLES (1024px+)
                   These remain EXACTLY as they were - no changes
                   ============================================================ */
                .packages-page {
                    /* Desktop - original spacing */
                }

                .page-title {
                    font-size: 1.875rem;
                    font-weight: 700;
                    margin-bottom: 2rem;
                }

                .package-form {
                    margin-bottom: 2.5rem;
                }

                .form-input {
                    width: 100%;
                    padding: 0.75rem;
                    border-radius: 0.75rem;
                    background-color: var(--secondary);
                    font-size: 1rem;
                    border: none;
                    outline: none;
                    box-sizing: border-box;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .featured-label {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                }

                .featured-checkbox {
                    width: 1.25rem;
                    height: 1.25rem;
                    accent-color: var(--primary);
                    cursor: pointer;
                }

                .featured-text {
                    font-size: 0.875rem;
                }

                .submit-btn {
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

                .submit-btn:hover {
                    opacity: 0.9;
                }

                .packages-grid {
                    display: grid;
                    gap: 1.25rem;
                    grid-template-columns: 1fr 1fr;
                }

                .package-card {
                    background-color: var(--secondary);
                    border-radius: 1rem;
                    padding: 1.5rem;
                }

                .card-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                }

                .card-title-group {
                    flex: 1;
                    min-width: 0;
                }

                .card-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin: 0;
                    word-wrap: break-word;
                }

                .card-price {
                    color: var(--primary);
                    font-weight: 600;
                    margin-top: 0.25rem;
                }

                .featured-badge {
                    background-color: var(--primary);
                    color: var(--background);
                    font-size: 0.75rem;
                    font-weight: 700;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    white-space: nowrap;
                    flex-shrink: 0;
                    margin-left: 0.75rem;
                }

                .features-list {
                    margin-top: 1.25rem;
                    padding: 0;
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .check-mark {
                    color: var(--primary);
                    flex-shrink: 0;
                }

                .feature-text {
                    word-wrap: break-word;
                }

                .card-actions {
                    display: flex;
                    gap: 0.75rem;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }

                .edit-btn {
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

                .edit-btn:hover {
                    background-color: #2563eb;
                }

                .delete-btn {
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

                .delete-btn:hover {
                    background-color: #dc2626;
                }

                .empty-state {
                    text-align: center;
                    padding: 3rem 0;
                    color: var(--muted);
                }

                /* ============================================================
                   MOBILE OPTIMIZATION (< 1024px)
                   Premium, compact, production-ready mobile experience
                   ============================================================ */
                @media screen and (max-width: 1023px) {
                    /* Container - balanced edge padding */
                    .packages-page {
                        padding: 0 clamp(0.5rem, 2.5vw, 1.25rem);
                        width: 100%;
                        max-width: 100%;
                        overflow-x: hidden;
                        box-sizing: border-box;
                    }

                    /* Title - scaled down, premium feel */
                    .page-title {
                        font-size: clamp(1.25rem, 3.5vw, 1.5rem);
                        font-weight: 700;
                        margin-bottom: clamp(0.75rem, 2vw, 1.25rem);
                        letter-spacing: -0.02em;
                    }

                    /* Form - compact spacing */
                    .package-form {
                        margin-bottom: clamp(1rem, 3vw, 1.75rem);
                        display: flex;
                        flex-direction: column;
                        gap: clamp(0.5rem, 1.25vw, 0.75rem);
                    }

                    /* Inputs - perfectly sized for mobile */
                    .form-input {
                        padding: clamp(0.5rem, 1.25vw, 0.625rem);
                        font-size: clamp(0.813rem, 1.4vw, 0.875rem);
                        border-radius: clamp(0.5rem, 1.25vw, 0.625rem);
                        min-height: 44px;
                        -webkit-appearance: none;
                        background-color: var(--secondary);
                        border: 1px solid transparent;
                        transition: border-color 0.2s;
                    }

                    .form-input:focus {
                        border-color: var(--primary);
                        outline: none;
                    }

                    /* Features grid - stacks on mobile, 2-col on tablet */
                    .features-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: clamp(0.375rem, 1vw, 0.625rem);
                    }

                    @media screen and (min-width: 640px) and (max-width: 1023px) {
                        .features-grid {
                            grid-template-columns: 1fr 1fr;
                        }
                    }

                    /* Checkbox - touch-friendly */
                    .featured-label {
                        gap: clamp(0.375rem, 1vw, 0.5rem);
                        margin: clamp(0.125rem, 0.5vw, 0.25rem) 0;
                    }

                    .featured-checkbox {
                        width: clamp(1rem, 1.75vw, 1.125rem);
                        height: clamp(1rem, 1.75vw, 1.125rem);
                        min-width: 44px;
                        min-height: 44px;
                        cursor: pointer;
                    }

                    .featured-text {
                        font-size: clamp(0.75rem, 1.2vw, 0.813rem);
                        font-weight: 500;
                    }

                    /* Submit button - full width, premium feel */
                    .submit-btn {
                        padding: clamp(0.5rem, 1.25vw, 0.625rem) clamp(0.75rem, 2vw, 1rem);
                        font-size: clamp(0.813rem, 1.4vw, 0.875rem);
                        min-height: 48px;
                        width: 100%;
                        border-radius: clamp(0.5rem, 1.25vw, 0.625rem);
                        font-weight: 600;
                        letter-spacing: 0.01em;
                        transition: all 0.2s;
                    }

                    /* Packages grid - clean single column */
                    .packages-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: clamp(0.625rem, 1.75vw, 0.875rem);
                    }

                    @media screen and (min-width: 640px) and (max-width: 1023px) {
                        .packages-grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }

                    /* Cards - compact, premium spacing */
                    .package-card {
                        padding: clamp(0.75rem, 2vw, 1.125rem);
                        border-radius: clamp(0.625rem, 1.5vw, 0.75rem);
                        background-color: var(--secondary);
                        transition: transform 0.2s;
                    }

                    /* Card header - clean alignment */
                    .card-header {
                        display: flex;
                        align-items: flex-start;
                        justify-content: space-between;
                        gap: clamp(0.375rem, 1vw, 0.5rem);
                        flex-wrap: wrap;
                    }

                    .card-title-group {
                        flex: 1;
                        min-width: 0;
                    }

                    /* Card title - perfectly scaled */
                    .card-title {
                        font-size: clamp(0.938rem, 2.25vw, 1.063rem);
                        font-weight: 700;
                        line-height: 1.3;
                        margin: 0;
                        word-wrap: break-word;
                        letter-spacing: -0.01em;
                    }

                    .card-price {
                        font-size: clamp(0.813rem, 1.4vw, 0.875rem);
                        font-weight: 600;
                        margin-top: clamp(0.125rem, 0.5vw, 0.188rem);
                        color: var(--primary);
                    }

                    /* Featured badge - compact */
                    .featured-badge {
                        font-size: clamp(0.563rem, 0.9vw, 0.625rem);
                        font-weight: 700;
                        padding: clamp(0.125rem, 0.4vw, 0.188rem) clamp(0.5rem, 1.2vw, 0.625rem);
                        border-radius: 9999px;
                        white-space: nowrap;
                        flex-shrink: 0;
                        margin-left: 0;
                        text-transform: uppercase;
                        letter-spacing: 0.03em;
                    }

                    /* Features list - compact spacing */
                    .features-list {
                        margin-top: clamp(0.625rem, 1.75vw, 0.875rem);
                        padding: 0;
                        list-style: none;
                        display: flex;
                        flex-direction: column;
                        gap: clamp(0.25rem, 0.75vw, 0.375rem);
                    }

                    .feature-item {
                        display: flex;
                        align-items: center;
                        gap: clamp(0.25rem, 0.75vw, 0.375rem);
                        font-size: clamp(0.75rem, 1.2vw, 0.813rem);
                        line-height: 1.4;
                    }

                    .check-mark {
                        color: var(--primary);
                        flex-shrink: 0;
                        font-size: clamp(0.688rem, 1vw, 0.75rem);
                        font-weight: 700;
                    }

                    .feature-text {
                        word-wrap: break-word;
                    }

                    /* Card actions - touch-friendly buttons */
                    .card-actions {
                        display: flex;
                        gap: clamp(0.375rem, 1vw, 0.5rem);
                        margin-top: clamp(0.75rem, 2vw, 1rem);
                        flex-wrap: wrap;
                    }

                    .edit-btn,
                    .delete-btn {
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

                    .edit-btn {
                        background-color: #3b82f6;
                        color: white;
                    }

                    .edit-btn:hover {
                        background-color: #2563eb;
                    }

                    .delete-btn {
                        background-color: #ef4444;
                        color: white;
                    }

                    .delete-btn:hover {
                        background-color: #dc2626;
                    }

                    /* Empty state - subtle */
                    .empty-state {
                        text-align: center;
                        padding: clamp(1.5rem, 4vw, 2.5rem) 0;
                        color: var(--muted);
                        font-size: clamp(0.813rem, 1.2vw, 0.875rem);
                    }

                    /* ============================================================
                       EXTRA SMALL SCREENS (320-375px)
                       Ultra-compact for smallest devices
                       ============================================================ */
                    @media screen and (max-width: 375px) {
                        .packages-page {
                            padding: 0 0.5rem;
                        }

                        .page-title {
                            font-size: 1.125rem;
                            margin-bottom: 0.625rem;
                        }

                        .package-form {
                            gap: 0.375rem;
                        }

                        .form-input {
                            padding: 0.438rem 0.625rem;
                            font-size: 0.75rem;
                            min-height: 40px;
                        }

                        .features-grid {
                            gap: 0.313rem;
                        }

                        .package-card {
                            padding: 0.625rem;
                        }

                        .card-title {
                            font-size: 0.875rem;
                        }

                        .card-price {
                            font-size: 0.75rem;
                        }

                        .feature-item {
                            font-size: 0.688rem;
                            gap: 0.188rem;
                        }

                        .edit-btn,
                        .delete-btn {
                            font-size: 0.688rem;
                            padding: 0.313rem 0.5rem;
                            min-height: 40px;
                            min-width: 50px;
                        }

                        .featured-badge {
                            font-size: 0.5rem;
                            padding: 0.125rem 0.375rem;
                        }

                        .card-actions {
                            gap: 0.313rem;
                            margin-top: 0.625rem;
                        }

                        .features-list {
                            gap: 0.188rem;
                            margin-top: 0.5rem;
                        }

                        .submit-btn {
                            font-size: 0.75rem;
                            padding: 0.438rem 0.625rem;
                            min-height: 40px;
                        }
                    }

                    /* ============================================================
                       SMALL PHONES (376-414px)
                       Slightly more breathing room
                       ============================================================ */
                    @media screen and (min-width: 376px) and (max-width: 414px) {
                        .packages-page {
                            padding: 0 0.625rem;
                        }

                        .page-title {
                            font-size: 1.25rem;
                        }

                        .form-input {
                            padding: 0.5rem 0.625rem;
                        }

                        .package-card {
                            padding: 0.688rem;
                        }
                    }

                    /* ============================================================
                       TABLETS (640-1023px)
                       Two-column layout with refined spacing
                       ============================================================ */
                    @media screen and (min-width: 640px) and (max-width: 1023px) {
                        .packages-page {
                            padding: 0 clamp(0.75rem, 2vw, 1.25rem);
                        }

                        .page-title {
                            font-size: clamp(1.375rem, 3vw, 1.625rem);
                            margin-bottom: clamp(0.875rem, 2vw, 1.25rem);
                        }

                        .package-form {
                            gap: clamp(0.5rem, 1vw, 0.75rem);
                        }

                        .form-input {
                            padding: clamp(0.5rem, 1vw, 0.625rem);
                            font-size: clamp(0.813rem, 1.2vw, 0.875rem);
                        }

                        .package-card {
                            padding: clamp(0.875rem, 1.75vw, 1.125rem);
                        }

                        .card-title {
                            font-size: clamp(1rem, 2vw, 1.125rem);
                        }

                        .feature-item {
                            font-size: clamp(0.75rem, 1.2vw, 0.813rem);
                        }

                        .edit-btn,
                        .delete-btn {
                            padding: clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem);
                            min-height: 44px;
                            flex: 0 1 auto;
                        }

                        .card-actions {
                            gap: clamp(0.5rem, 1vw, 0.625rem);
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

                    input,
                    button,
                    textarea,
                    select {
                        max-width: 100%;
                        box-sizing: border-box;
                    }

                    /* ============================================================
                       TOUCH TARGET ENHANCEMENTS
                       All interactive elements at least 44px
                       ============================================================ */
                    @media (pointer: coarse) {
                        .featured-checkbox {
                            min-width: 44px;
                            min-height: 44px;
                        }

                        .edit-btn,
                        .delete-btn,
                        .submit-btn {
                            min-height: 48px;
                        }

                        .form-input {
                            min-height: 44px;
                        }
                    }

                    /* ============================================================
                       SMOOTH SCROLLING & PERFORMANCE
                       ============================================================ */
                    @media screen and (max-width: 1023px) {
                        html {
                            -webkit-text-size-adjust: 100%;
                            scroll-behavior: smooth;
                        }

                        .package-card {
                            -webkit-tap-highlight-color: transparent;
                        }

                        .edit-btn,
                        .delete-btn,
                        .submit-btn {
                            -webkit-tap-highlight-color: transparent;
                        }
                    }
                }
            `}</style>
        </div>
    );
}