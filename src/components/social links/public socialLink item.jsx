
export function PublicSocialLinkItem({ label, link }) {

  return (
    <div className="flex items-center gap-2 text-white">
        <div className="flex justify-center items-center gap-2 bg-black rounded-2xl p-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {label}
          </a>
        </div>
    </div>
  );
}