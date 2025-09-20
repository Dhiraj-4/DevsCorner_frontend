import { useState } from "react";
import { CoolButton } from "../Buttons/button";
import { X } from "lucide-react";

export function SocialLinkItem({ label, link, onSave, onDelete }) {
  const [isInput, setIsInput] = useState(false);
  const [error, setError] = useState("");

  const validateUrl = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSave = async () => {
    const input = document.getElementById(`${label}-link-input`).value.trim();

    if (!input) {
      setError(`${label} link is required`);
      return;
    }
    if (!validateUrl(input)) {
      setError("Invalid URL format");
      return;
    }

    try {
      let res = await onSave(input);

      if(res.status == 400) {
        setError(res.message);
      }else if(res.status == 500) {
        setError(res.message);
      }else if(res.status == 200) {
        setError("");
        setIsInput(false);
      }
    } catch (err) {
      setError("Failed to save link");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-2 text-white">
      {link ? (
        <div className="flex justify-center items-center gap-2 bg-black rounded-2xl p-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {label}
          </a>
          <X
            className="w-4 h-4 hover:text-red-400 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          {isInput ? (
            <div className="flex flex-wrap items-center gap-2">
              <input
                id={`${label}-link-input`}
                required
                className="px-2 py-1 rounded bg-gray-900 text-white text-sm border border-gray-700 focus:outline-none"
                placeholder={`Enter ${label} link`}
                onChange={() => setError("")}
              />
              <div className="flex gap-2">

              <CoolButton text="save" clickHandler={handleSave} />
              <CoolButton text="cancel" clickHandler={() => { setIsInput(false); setError(""); }} />
              </div>
            </div>
          ) : (
            <CoolButton text={`Add ${label}`} clickHandler={() => setIsInput(true)} />
          )}
          {error && <span className="text-red-400 text-base font-bold">{error}</span>}
        </div>
      )}
    </div>
  );
}