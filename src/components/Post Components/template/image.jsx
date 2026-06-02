import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { uploadImage } from "./uploadImage.js";
import { deleteImage } from "./deleteImage.js";
import { SkeletonBlock } from "../../../components/loaders/skeletonLoaders.jsx";

export function Image({ image, owner, postId }) {
  const [error, setError] = useState("");
  const [imageState, setImageState] = useState(image);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (file) => {
    try {
      setIsLoading(true);
      let res = await uploadImage(file, postId);

      if (res.status == 200) {
        setError("");
        setImageState(res.fileUrl);
      } else if (res.status == 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Failed to update post image. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <SkeletonBlock height="6rem" /> : 
      
        <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        {imageState ? (
          <img
            src={imageState}
            alt="#Image"
            className="w-full h-full object-cover rounded-xl border border-neutral-300 dark:border-neutral-700 shadow-sm"
          />
        ) : (
          <div className="text-neutral-700 dark:text-neutral-300 font-medium">
           Image
          </div>
        )}

        {owner === "YOU" && (
          <div className="flex items-center gap-2">
            {/* Upload Button */}
            <div
              onClick={() =>
                document.getElementById(`imageUploader-${postId}`).click()
              }
              className="flex cursor-pointer w-8 h-8 rounded-full 
                         bg-neutral-200 dark:bg-neutral-700 
                         hover:bg-neutral-300 dark:hover:bg-neutral-600 
                         items-center justify-center transition-all duration-200 shadow-sm"
            >
              <Pencil
                size={18}
                className="text-neutral-700 dark:text-neutral-100"
              />
            </div>

            {/* Delete Button */}
            {imageState && (
              <Trash2
                size={20}
                className="cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-red-500 transition-colors duration-150"
                onClick={async () => {
                  setIsLoading(true);
                  let res = await deleteImage(postId);
                  if (res.status == 200) setImageState("");
                  else setError("Something went wrong");
                  setIsLoading(false);
                }}
              />
            )}
          </div>
        )}
      </div>

      {error && (
        <span className="text-red-500 text-sm font-medium">{error}</span>
      )}

      <input
        id={`imageUploader-${postId}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
          e.target.value = "";
        }}
      />
    </div>
      }
    </>
  );
}