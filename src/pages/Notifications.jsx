import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore.js";
import { useTheme } from "../theme-provider.jsx";
import axios from "axios";
import { BACKEND_URL } from "../../config/envConfig.js";
import { useNotifStore } from "../store/notificationStore.js";
import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";

export default function Notifications() {

  const { accessToken } = useAuthStore();
  const { activeTheme } = useTheme();
  const { notifications, setAllNotifications } = useNotifStore();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!accessToken) return;
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}notification/unseen`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        setAllNotifications(res.data.info);
      } catch (error) {
        console.log("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-lg font-medium">
        <IsLoadingSvg />
      </div>
    );
  }

  return (
    <div
      className={`w-full pt-24 min-h-screen flex flex-col items-center transition-colors duration-300 ${
        activeTheme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-[#0d0d0d] text-gray-200"
      }`}
    >
      <div className="w-full max-w-3xl px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>

        {notifications.length === 0 ? (
          <div className="text-center opacity-70 mt-10">
            No notifications yet.
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif._id}
                className={`p-4 rounded-xl shadow transition-all border
                ${
                  activeTheme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-[#1a1a1a] border-[#333]"
                }`}
              >
                {notif.type === "post" && (
                  <p>
                    <span className="font-semibold">New post</span> from {notif.from}
                    you follow: “{notif.data.text}”
                  </p>
                )}

                {notif.type === "job" && (
                  <p>
                    <span className="font-semibold">New job posted:</span>{" "}
                    {notif.data.role} — {notif.data.companyName} (
                    {notif.data.location})
                  </p>
                )}

                {notif.type === "message" && (
                  <p>
                    <span className="font-semibold">New message</span> from{" "}
                    {notif.from}
                  </p>
                )}

                <div className="text-xs opacity-60 mt-2">
                  {new Date(notif.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}