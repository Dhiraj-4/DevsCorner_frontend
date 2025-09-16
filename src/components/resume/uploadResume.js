import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { refreshToken } from "../../utils/refreshToken";

export async function uploadResume(file) {
    const { accessToken } = useAuthStore.getState();
    const { hydrateUser } = useUserStore.getState();
  try {
    // 1. Ask backend for a pre-signed URL
    const res = await axios.post(
    `${BACKEND_URL}user/genarate-resume-upload-url`,
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
    await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
    });

    // 3. Get the public URL
    const response = await axios.patch(
      `${BACKEND_URL}user/uplaod-resume`,
      {
        fileUrl 
      },
      {
      headers: {
        Authorization: `Bearer ${accessToken}`, // standard convention
      },
    }
    );
    await hydrateUser();
    console.log(response);
    
  } catch (err) {
    if(err.response?.status == 403 || err.response?.status == 401) {
      let res = await refreshToken();
      if(res) await uploadResume(file);
    }
    console.error("Upload failed:", err);
    throw err;
  }
}