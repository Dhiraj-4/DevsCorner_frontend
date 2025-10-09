import axios from "axios";
import { BACKEND_URL } from "../../../config/envConfig";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { refreshToken } from "../../utils/refreshToken";

export async function uploadSkill(skill) {
  try {
    const { accessToken } = useAuthStore.getState();
    const { hydrateUser } = useUserStore.getState();

    const res = await axios.post(
      `${BACKEND_URL}user/upload-skills`,
      { skill }, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    await hydrateUser();
    return { status: 200, message: "Skill added successfully" };
  } catch (err) {
    if(err.response?.status == 403 || err.response?.status == 401) {
          let res = await refreshToken();
          if(res) await uploadSkill(skill);
    }else if(err.response?.status == 400) {
      return { status: err.response?.status, message: err.response?.data.message }
    }else {
      return { status: err.response?.status || 500, message: err.message };
    }
      console.error("deletion failed:", err);
  }
}