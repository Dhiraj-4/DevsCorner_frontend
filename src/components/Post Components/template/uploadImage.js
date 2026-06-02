import axios from "axios";
import { BACKEND_URL } from "../../../../config/envConfig.js";
import { useAuthStore } from "../../../store/authStore.js";

export async function uploadImage(file, postId) {
    const { accessToken } = useAuthStore.getState();

  try {
    // 1. Ask backend for a pre-signed URL
    const res = await axios.post(
    `${BACKEND_URL}post/genarate-image-upload-url`,
    {
      fileName: file.name,
      fileType: file.type,
      postId
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
      `${BACKEND_URL}post/upload-image`,
      {
        fileUrl,
        postId
      },
      {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    );
    console.log(response);
    return { status: 200, fileUrl };
  } catch (err) {
    if(err.response?.status == 401) {
      let res = await refreshToken();
      if(res) return await uploadImage(file, postId);
    }
    else {
      console.log(err);
      return { status: 500 };
    }
  }
}