export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20 md:mt-32 bg-[var(--background)]">

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-14 md:py-20">

        {/* TOP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14">

          {/* BRAND */}
          <div className="col-span-2 lg:col-span-1">

            <h2 className="text-2xl md:text-3xl font-bold">
              ThriveFit<span className="text-[var(--primary)]">Club</span>
            </h2>

            <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed mt-5">
              Premium physiotherapy, recovery, and performance
              optimization platform built for modern athletes
              and active lifestyles.
            </p>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-[var(--text)] font-semibold text-base md:text-lg mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-[var(--muted)] text-sm md:text-base">

              <a
                href="#services"
                className="hover:text-[var(--primary)] transition"
              >
                Services
              </a>

              <a
                href="#performance"
                className="hover:text-[var(--primary)] transition"
              >
                Performance
              </a>

              <a
                href="#testimonials"
                className="hover:text-[var(--primary)] transition"
              >
                Testimonials
              </a>

              <a
                href="#consultation"
                className="hover:text-[var(--primary)] transition"
              >
                Consultation
              </a>

            </div>

          </div>

          {/* SERVICES */}
          <div>

            <h3 className="text-[var(--text)] font-semibold text-base md:text-lg mb-5">
              Services
            </h3>

            <div className="flex flex-col gap-3 text-[var(--muted)] text-sm md:text-base">

              <p>Sports Rehabilitation</p>

              <p>Mobility Coaching</p>

              <p>Injury Recovery</p>

              <p>Strength Training</p>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-[var(--text)] font-semibold text-base md:text-lg mb-5">
              Contact
            </h3>

            <div className="flex flex-col gap-3 text-[var(--muted)] text-sm md:text-base">

              <p>trainedbysunny24@gmail.com</p>

              <p>+91 97337505508</p>

              <p>Ahmedabad, Gujarat</p>

            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-[var(--border)] my-10 md:my-12" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-[var(--muted)] text-xs md:text-sm text-center md:text-left">
            © 2026 ThriveFitClub. All rights reserved.
          </p>

          {/* SOCIALS */}
          <div className="flex items-center gap-5 text-[var(--muted)] text-sm">

            <a
              href="https://www.instagram.com/thrivefitclub_?igsh=MXd1MXM5cGIyZmE5Nw%3D%3D&utm_source=qr"
              className="hover:text-[var(--primary)] transition"
            >
              Instagram
            </a>

            <a
              href="#"
              className="hover:text-[var(--primary)] transition"
            >
              Whatsapp
            </a>
            <a
              href="/portal"
              className="hover:text-[var(--primary)] transition opacity-40 hover:opacity-100"
            >
              Portal
            </a>
          </div>

        </div>

      </div>

    </footer>
  );
}