import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { uploadBrandImage } from "./utils/uploadBrandImage.js";
import { deleteBrandImage } from "./utils/deleteBrandImage.js";
import { SkeletonBlock } from "../../../components/loaders/skeletonLoaders.jsx";

export function BrandImage({ brandImage, owner, jobId }) {
  const [error, setError] = useState("");
  const [brandImageState, setBrandImageState] = useState(brandImage);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (file) => {
    try {
      setIsLoading(true);
      let res = await uploadBrandImage(file, jobId);

      if (res.status == 200) {
        setError("");
        setBrandImageState(res.fileUrl);
      } else if (res.status == 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Failed to update brand image. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <SkeletonBlock height="6rem" /> : 
      
        <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        {brandImageState ? (
          <img
            src={brandImageState}
            alt="Brand"
            className="w-full h-full object-cover rounded-xl border border-neutral-300 dark:border-neutral-700 shadow-sm"
          />
        ) : (
          <div className="text-neutral-700 dark:text-neutral-300 font-medium">
            Brand Image
          </div>
        )}

        {owner === "YOU" && (
          <div className="flex items-center gap-2">
            {/* Upload Button */}
            <div
              onClick={() =>
                document.getElementById(`brandImageUploader-${jobId}`).click()
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
            {brandImageState && (
              <Trash2
                size={20}
                className="cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-red-500 transition-colors duration-150"
                onClick={async () => {
                  setIsLoading(true);
                  let res = await deleteBrandImage(jobId);
                  if (res.status == 200) setBrandImageState("");
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
        id={`brandImageUploader-${jobId}`}
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