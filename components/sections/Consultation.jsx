"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";

export default function Consultation() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    goals: "",
  });

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("consultations")
      .insert([formData]);

    if (error) {
      toast.error(
        "Submission failed"
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
              "consultation",

            full_name:
              formData.full_name,

            email:
              formData.email,

            phone:
              formData.phone,

            goals:
              formData.goals,
          }),
        }
      );
      toast.success(
        "Consultation submitted"
      );

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        goals: "",
      });
    }

    setLoading(false);
  };
  return (
    <section id="consultation" className="py-14 md:py-32 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">

        <div className="grid lg:grid-cols-2 gap-14 md:gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <p className="text-yellow-400 uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm">
              Consultation
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mt-4 md:mt-6 leading-[1.1]">
              Start Your Recovery & Performance Journey
            </h2>

            <p className="text-zinc-400 mt-4 md:mt-8 leading-relaxed text-sm sm:text-base md:text-lg">
              Book a premium consultation session focused on injury
              recovery, mobility improvement, strength development,
              and long-term performance optimization.
            </p>

            <div className="mt-6 md:mt-10 space-y-3 md:space-y-5">

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <p className="text-zinc-300 text-sm md:text-base">
                  Personalized Recovery Plans
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <p className="text-zinc-300 text-sm md:text-base">
                  Mobility & Strength Analysis
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <p className="text-zinc-300 text-sm md:text-base">
                  Athlete Performance Optimization
                </p>
              </div>

            </div>

          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl md:rounded-[40px] p-4 md:p-10"
          >

            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
            >

              <div>
                <label className="text-sm text-zinc-400">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      full_name: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-black/30 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-black/30 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">
                  Mobile Number
                </label>

                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-black/30 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">
                  Your Goals
                </label>

                <textarea
                  rows="5"
                  placeholder="Tell us about your recovery or performance goals"
                  value={formData.goals}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      goals: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-black/30 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base outline-none focus:border-yellow-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 text-black py-3 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold hover:scale-[1.02] transition duration-300"
              >
                {loading
                  ? "Submitting..."
                  : "Book Consultation"}
              </button>

            </form>

          </motion.div>

        </div>

      </div>

    </section>
  );
}