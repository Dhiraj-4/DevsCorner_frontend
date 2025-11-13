import { useTheme } from "../../theme-provider.jsx";

export function PublicSkillItem({ skillKey }) {
  const { activeTheme } = useTheme();

  const bgColor =
    activeTheme === "dark"
      ? "bg-neutral-800 text-white border border-neutral-700"
      : "bg-neutral-100 text-black border border-neutral-300";

  return (
    <div
      className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium shadow-sm transition-colors duration-300 ${bgColor}`}
    >
      <span>{skillKey}</span>
    </div>
  );
}