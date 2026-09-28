export default function AuthButton({
  children,
  loading,
  type = "submit",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className="
        w-full rounded-xl
        bg-[#102B52]
        py-3.5
        font-semibold
        text-white
        transition
        hover:bg-[#173b70]
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}