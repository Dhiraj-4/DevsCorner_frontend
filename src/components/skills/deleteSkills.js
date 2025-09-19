import axios from "axios";
import { BACKEND_URL } from "../../../config/envConfig";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { refreshToken } from "../../utils/refreshToken";

export async function deleteSkill(skill) {
  try {
    const { accessToken } = useAuthStore.getState();
    const { hydrateUser } = useUserStore.getState();

    const res = await axios.delete(`${BACKEND_URL}user/delete-skill`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: { skill }, // backend will $unset: { [`skills.${skill}`]: "" }
    });

    await hydrateUser();
    return { status: 200, message: "Skill deleted successfully" };
  } catch (err) {
    if(err.response?.status == 403 || err.response?.status == 401) {
          let res = await refreshToken();
          if(res) await deleteSkill(skill);
        }
        console.error("deletion failed:", err);
    return { status: err.response?.status || 500, message: err.message };
  }
}