export default function Button({
  children,
  variant = "primary",
}) {
  return (
    <button
      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
        variant === "primary"
          ? "bg-[var(--primary)] text-black hover:scale-105"
          : "border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--secondary)]"
      }`}
    >
      {children}
    </button>
  );
}