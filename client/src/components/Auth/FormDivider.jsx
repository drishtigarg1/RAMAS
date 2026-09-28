export default function FormDivider() {
  return (
    <div className="flex items-center gap-4 py-6">

      <div className="h-px flex-1 bg-slate-300" />

      <span className="text-sm text-slate-500">
        OR
      </span>

      <div className="h-px flex-1 bg-slate-300" />

    </div>
  );
}