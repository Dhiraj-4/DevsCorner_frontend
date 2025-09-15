import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { refreshToken } from "../../utils/refreshToken";

export const deleteResume = async() => {
    const { accessToken } = useAuthStore.getState();
    const { hydrateUser } = useUserStore.getState();
  try {
    
    const res = await axios.delete(
        `${BACKEND_URL}user/delete-resume`,
        {
            headers: {
            Authorization: `Bearer ${accessToken}`, // standard convention
            },
        }
    );

    await hydrateUser();
  }catch(err) {
    if(err.response?.status == 403) {
      let res = await refreshToken();
      if(res) await deleteResume();
    }
    console.error("deletion failed:", err);
    throw err;
  }
}