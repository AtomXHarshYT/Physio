export default function Button({
  children,
  variant = "primary",
}) {
  return (
    <button
      className={`px-6 py-3 rounded-full font-medium transition duration-300 ${
        variant === "primary"
          ? "bg-yellow-400 text-black hover:scale-105"
          : "border border-white/10 hover:bg-white/10 text-white"
      }`}
    >
      {children}
    </button>
  );
}