export function F1Logo() {
  return (
    <div className="flex items-center gap-2 select-none cursor-pointer">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-yellow-400 flex items-center justify-center rounded-sm">
        <span className="text-white text-xs md:text-sm font-bold">F1</span>
      </div>
      <span className="text-[10px] md:text-sm uppercase tracking-[0.2em] opacity-90 hidden sm:block">
        Brasil
      </span>
    </div>
  );
}