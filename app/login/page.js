"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log(data);
    console.log(error);

    if (error) {

      alert(error.message);

    } else {

      window.location.href =
        "/dashboard";
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 md:px-6">

      <div className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl md:rounded-[40px] p-5 md:p-8">

        <p className="text-yellow-400 uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm">
          Admin Access
        </p>

        <h1 className="text-2xl md:text-4xl font-bold mt-2 md:mt-4">
          Login Dashboard
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4 md:space-y-6 mt-6 md:mt-10"
        >

          <div>
            <label className="text-xs md:text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full mt-1.5 md:mt-2 bg-black/30 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs md:text-sm text-zinc-400">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full mt-1.5 md:mt-2 bg-black/30 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base outline-none focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </main>
  );
}