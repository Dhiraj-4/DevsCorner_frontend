
// export function PublicSocialLinkItem({ label, link }) {

//   return (
//     <div className="flex items-center gap-2 text-white">
//         <div className="flex justify-center items-center gap-2 bg-black rounded-2xl p-2">
//           <a
//             href={link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:underline"
//           >
//             {label}
//           </a>
//         </div>
//     </div>
//   );
// }

import { useTheme } from "../../theme-provider.jsx";

export function PublicSocialLinkItem({ label, link }) {
  const { activeTheme } = useTheme();

  const bgColor =
    activeTheme === "dark"
      ? "bg-neutral-800 text-white border border-neutral-700"
      : "bg-neutral-100 text-black border border-neutral-300";

  return (
    <div
      className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium shadow-sm transition-colors duration-300 ${bgColor}`}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline hover:opacity-80 transition-opacity"
      >
        {label}
      </a>
    </div>
  );
}
