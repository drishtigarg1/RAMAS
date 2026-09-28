import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  return (
    <button
      className="
        flex w-full items-center
        justify-center gap-3
        rounded-xl border
        border-slate-300
        bg-white
        py-3
        transition
        hover:bg-slate-50
      "
    >
      <FcGoogle size={24} />

      Continue with Google
    </button>
  );
}