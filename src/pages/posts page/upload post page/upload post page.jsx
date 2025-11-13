import { useNavigate } from "react-router-dom";
import { createPostHandler } from "./createPostHandler.js";
import { usePostStore } from "../../../store/postStore.js";
import { CoolButton } from "../../../components/Buttons/button.jsx";
import { IsLoadingSvg } from "../../../components/loaders/isLoadingSvg.jsx";
import { Error } from "../../../components/errors/error.jsx";
import { Input } from "../../../components/Inputs/input.jsx";
import { CreatePostHeader } from "../../../components/headers/createPostHeader.jsx";
import { useTheme } from "../../../theme-provider.jsx";

export function UploadPostPage() {
  const { text, setText, isLoading } = usePostStore();
  const navigate = useNavigate();
  const { activeTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createPostHandler();
    if (success) navigate("/feed");
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
    <div
      className={`min-h-screen pt-20 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 transition-colors duration-300 ${bgColor}`}
    >
      {/* Header */}
      <CreatePostHeader />

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md backdrop-blur-sm border rounded-2xl shadow-md p-6 mt-8 flex flex-col gap-5 transition-colors duration-300 ${cardBg}`}
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

        <CoolButton
          text={isLoading ? <IsLoadingSvg /> : "Create Post"}
          className={`w-full text-base font-medium transition-colors ${buttonTheme}`}
        />
      </form>
    </div>
  );
}
