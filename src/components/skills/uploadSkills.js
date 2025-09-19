import axios from "axios";
import { BACKEND_URL } from "../../../config/envConfig";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";

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
    console.log(err);
    if(err.response?.status == 403 || err.response?.status == 401) {
              let res = await refreshToken();
              if(res) await uploadSkill(skill);
            }
            console.error("deletion failed:", err);
    return { status: err.response?.status || 500, message: err.message };
  }
}