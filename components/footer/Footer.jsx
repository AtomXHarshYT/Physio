export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <h2 className="text-zinc-400 text-sm">
          © 2026 PhysioX. All rights reserved.
        </h2>

        <div className="flex gap-6 text-sm text-zinc-500">
          <p>Instagram</p>
          <p>LinkedIn</p>
          <p>YouTube</p>
        </div>
      </div>
    </footer>
  );
}