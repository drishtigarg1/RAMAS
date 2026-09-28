export default function PasswordStrength({ password }) {
  if (!password) return null;

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const levels = [
    {
      text: "Weak",
      color: "bg-red-500",
      width: "25%",
    },
    {
      text: "Fair",
      color: "bg-yellow-500",
      width: "50%",
    },
    {
      text: "Good",
      color: "bg-blue-500",
      width: "75%",
    },
    {
      text: "Strong",
      color: "bg-green-500",
      width: "100%",
    },
  ];

  const current = levels[Math.max(strength - 1, 0)];

  return (
    <div className="mt-2">
      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full ${current.color} transition-all duration-300`}
          style={{ width: current.width }}
        />
      </div>

      <p className="mt-1 text-xs text-slate-500">
        Password Strength :
        <span className="ml-1 font-semibold">
          {current.text}
        </span>
      </p>
    </div>
  );
}