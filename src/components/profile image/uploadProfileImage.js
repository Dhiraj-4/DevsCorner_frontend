import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { BACKEND_URL } from "../../../config/envConfig";

export async function uploadProfileImage(file) {
    const { accessToken } = useAuthStore.getState();
  try {
    // 1. Ask backend for a pre-signed URL
    const res = await axios.post(
    `${BACKEND_URL}user/generate-upload-url`,
    {
      fileName: file.name,
      fileType: file.type,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // standard convention
      },
    }
    );
    console.log(res);
    const uploadUrl = res.data.info.uploadUrl;
    const fileUrl = res.data.info.fileUrl;

    // 2. Upload directly to storage (PUT request)
    const uploadResponse = await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
    });
    console.log(uploadResponse);

    // 3. Get the public URL (depends on your bucket setup)
    const imageUrl = uploadUrl.split("?")[0]; // strip query params
    return imageUrl;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
}