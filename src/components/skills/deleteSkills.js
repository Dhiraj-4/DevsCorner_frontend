import axios from "axios";
import { BACKEND_URL } from "../../../config/envConfig";
import { useAuthStore } from "../../store/authStore";
import { refreshToken } from "../../utils/refreshToken";

export async function deleteSkill(skill) {
  try {
    const { accessToken } = useAuthStore.getState();

    const res = await axios.delete(`${BACKEND_URL}user/delete-skill`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: { skill }, // backend will $unset: { [`skills.${skill}`]: "" }
    });

    return { status: 200, message: "Skill deleted successfully", skill };
  } catch (err) {
    if(err.response?.status == 401) {
          let res = await refreshToken();
          if(res) return await deleteSkill(skill);
    }else if(err.response?.status == 400) {
      return { status: err.response?.status, message: err.response?.data.message }
    }else {
      return { status: err.response?.status || 500, message: err.message };
    }
      console.error("deletion failed:", err);
  }
}