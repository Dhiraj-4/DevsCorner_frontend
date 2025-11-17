import axios from "axios";
import { BACKEND_URL } from "../../config/envConfig.js";
import { useNotifStore } from "../store/notificationStore.js";
import { useAuthStore } from "../store/authStore.js";

export const fetchNotifications = async () => {
  try {
    const { setAllNotifications } = useNotifStore.getState();
    const { accessToken } = useAuthStore.getState();
    const res = await axios.get(
      `${BACKEND_URL}notification/unseen`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    setAllNotifications(res.data.info);
    console.log(res);
  } catch (error) {
    console.log("Error fetching notifications:", error);
  } finally {
    return false;
  }
};