"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { supabase }
    from "@/lib/supabase";

export default function Booking() {

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            full_name: "",
            email: "",
            phone: "",
            appointment_date: "",
            message: "",
        });

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const { error } =
            await supabase
                .from("appointments")
                .insert([formData]);

        if (error) {

            toast.error(
                "Booking failed"
            );

            console.log(error);

        } else {
            await fetch(
                "/api/mail",

                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({

                        type:
                            "appointment",

                        full_name:
                            formData.full_name,

                        email:
                            formData.email,

                        phone:
                            formData.phone,

                        appointment_date:
                            formData.appointment_date,

                        message:
                            formData.message,
                    }),
                }
            );
            toast.success(
                "Appointment booked"
            );

            setFormData({
                full_name: "",
                email: "",
                phone: "",
                appointment_date: "",
                message: "",
            });
        }

        setLoading(false);
    };

    return (
        <section
            className="py-20 md:py-32 relative overflow-hidden"
        >

            {/* Glow */}
            <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-blue-500/10 blur-[80px] md:blur-[150px] rounded-full" />

            <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">

                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto">

                    <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm">
                        Appointment Booking
                    </p>

                    <h2 className="text-4xl md:text-6xl font-bold mt-6">
                        Book Your Session
                    </h2>

                    <p className="text-zinc-400 mt-6 leading-relaxed">
                        Schedule your physiotherapy or
                        performance consultation session.
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-20 border border-white/10 bg-white/5 backdrop-blur-xl rounded-[40px] p-8 md:p-10 space-y-6"
                >

                    {/* Name */}
                    <div>

                        <label className="text-sm text-zinc-400">
                            Full Name
                        </label>

                        <input
                            type="text"
                            required
                            value={formData.full_name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    full_name:
                                        e.target.value,
                                })
                            }
                            className="w-full mt-2 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
                        />

                    </div>

                    {/* Email */}
                    <div>

                        <label className="text-sm text-zinc-400">
                            Email
                        </label>

                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email:
                                        e.target.value,
                                })
                            }
                            className="w-full mt-2 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
                        />

                    </div>

                    {/* Phone */}
                    <div>

                        <label className="text-sm text-zinc-400">
                            Mobile Number
                        </label>

                        <input
                            type="text"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone:
                                        e.target.value,
                                })
                            }
                            className="w-full mt-2 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
                        />

                    </div>

                    {/* Date */}
                    <div>

                        <label className="text-sm text-zinc-400">
                            Appointment Date
                        </label>

                        <input
                            type="date"
                            required
                            value={
                                formData.appointment_date
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    appointment_date:
                                        e.target.value,
                                })
                            }
                            className="w-full mt-2 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
                        />

                    </div>

                    {/* Message */}
                    <div>

                        <label className="text-sm text-zinc-400">
                            Message
                        </label>

                        <textarea
                            rows="5"
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    message:
                                        e.target.value,
                                })
                            }
                            className="w-full mt-2 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 resize-none"
                        />

                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300"
                    >

                        {loading
                            ? "Booking..."
                            : "Book Appointment"}

                    </button>

                </form>

            </div>

        </section>
    );
}