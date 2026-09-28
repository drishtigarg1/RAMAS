export default function MenuItem({
  menu,
  active,
  onHover,
}) {
  return (
    <button
      onMouseEnter={onHover}
      className={`
        relative
        px-4
        py-5
        text-[15px]
        font-medium
        transition-all
        duration-300
        
        ${
          active
            ? "text-orange-600"
            : "text-slate-700 hover:text-orange-600"
        }
      `}
    >
      {menu.title}

      <span
        className={`
          absolute
          left-0
          bottom-0
          h-[3px]
          rounded-full
          bg-orange-500
          transition-all
          duration-300
          
          ${
            active
              ? "w-full"
              : "w-0"
          }
        `}
      />
    </button>
  );
}