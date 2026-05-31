import { useCommentStore } from "../../store/commentStore.js";
import { IsLoadingSvg } from "../loaders/isLoadingSvg";
import { useTheme } from "../../theme-provider.jsx";
import { createCommentHandler } from "./createCommentHandler.js";
import { Input } from "../Inputs/input.jsx";
import { CoolButton } from "../Buttons/button.jsx";
import { Error } from "../errors/error.jsx";
import { OnSaveButton } from "../Buttons/onSaveButton.jsx";

export function UploadComment({ postId, commentCount, setCommentCount }) {
  const { text, setText, isLoading } = useCommentStore();
  const { activeTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCommentHandler({ postId, commentCount, setCommentCount });
  };

  // theme-dependent styles
  const bgColor =
    activeTheme === "dark" ? "bg-neutral-950 text-neutral-100" : "bg-neutral-100 text-neutral-900";
  const cardBg =
    activeTheme === "dark"
      ? "bg-neutral-900/80 border-neutral-800"
      : "bg-white/80 border-neutral-300";
  const inputTheme =
    activeTheme === "dark"
      ? "bg-neutral-950 border-neutral-700 text-neutral-100 placeholder-neutral-500"
      : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400";
  const buttonTheme =
    activeTheme === "dark"
      ? "bg-indigo-600 hover:bg-indigo-500 text-white"
      : "bg-indigo-500 hover:bg-indigo-600 text-white";

  return (
      <form
        onSubmit={handleSubmit}
        className={`w-full backdrop-blur-sm border rounded-2xl shadow-md p-6 mt-5 flex justify-center items-center gap-5 transition-colors duration-300 ${cardBg}`}
      >
        {/* Error */}
        <Error />

        <Input
          type="text"
          name="text"
          required
          minLength={1}
          placeholder="What's on your mind?"
          value={text}
          set={setText}
          autoComplete="off"
          className={`w-full ${inputTheme}`}
        />

        <OnSaveButton
          text={isLoading ? <IsLoadingSvg /> : "➤"}
          className={`text-base font-medium transition-colors ${buttonTheme}`}
        />
      </form>
  );
}