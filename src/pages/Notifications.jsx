// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useAuthStore } from "../store/authStore.js";
// import { useTheme } from "../theme-provider.jsx";
// import { BACKEND_URL } from "../../config/envConfig.js";
// import { useNotifStore } from "../store/notificationStore.js";
// import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";
// import { OnSaveButton } from "../components/Buttons/onSaveButton.jsx";

// export default function Notifications() {
//   const { accessToken } = useAuthStore();
//   const { activeTheme } = useTheme();
//   const { notifications, setAllNotifications, notifType, setNotifType } = useNotifStore();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!accessToken) return;

//     const fetchNotifications = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}notification/unseen`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         setAllNotifications(res.data.info);
//       } catch (error) {
//         console.log("Error fetching notifications:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [accessToken]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-full text-lg font-medium">
//         <IsLoadingSvg />
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`w-full pt-24 min-h-screen flex flex-col items-center transition-colors duration-300 px-4
//         ${activeTheme === "light" ? "bg-gray-100 text-gray-900" : "bg-[#0d0d0d] text-gray-200"}
//       `}
//     >
//       <div className="w-full max-w-3xl py-4 sm:py-6">
//         <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Notifications</h1>

//         {/* FILTER BUTTONS */}
//         <div className="flex flex-wrap justify-center sm:justify-start p-3 gap-3 sm:gap-5">
//           <OnSaveButton text={"All"} onClick={() => setNotifType("all")} />
//           <OnSaveButton text={"Job"} onClick={() => setNotifType("job")} />
//           <OnSaveButton text={"Post"} onClick={() => setNotifType("post")} />
//           <OnSaveButton text={"Message"} onClick={() => setNotifType("message")} />
//         </div>

//         {/* EMPTY STATE */}
//         {notifications.length === 0 ? (
//           <div className="text-center opacity-70 mt-10 text-sm sm:text-base">
//             No notifications yet.
//           </div>
//         ) : (
//           <div className="space-y-4 sm:space-y-5 mt-4">
//             {notifications
//               .filter((notif) => notifType === "all" || notif.type === notifType)
//               .map((notif) => (
//                 <div
//                   key={notif._id}
//                   className={`p-4 sm:p-5 rounded-xl shadow transition-all border w-full
//                   ${activeTheme === "light" ? "bg-white border-gray-200" : "bg-[#1a1a1a] border-[#333]"}
//                 `}
//                 >
//                   {notif.type === "post" && (
//                     <p className="text-sm sm:text-base leading-relaxed">
//                       <span className="font-semibold">New post</span> from {notif.from} you follow: “{notif.data.text}”
//                     </p>
//                   )}

//                   {notif.type === "job" && (
//                     <p className="text-sm sm:text-base leading-relaxed">
//                       <span className="font-semibold">New job posted:</span> {notif.data.role} — {notif.data.companyName} ({notif.data.location})
//                     </p>
//                   )}

//                   {notif.type === "message" && (
//                     <p className="text-sm sm:text-base leading-relaxed">
//                       <span className="font-semibold">New message</span> from {notif.from}
//                     </p>
//                   )}

//                   <div className="text-[10px] sm:text-xs opacity-60 mt-2">
//                     {new Date(notif.createdAt).toLocaleString()}
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore.js";
import { useTheme } from "../theme-provider.jsx";
import { BACKEND_URL } from "../../config/envConfig.js";
import { useNotifStore } from "../store/notificationStore.js";
import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";
import { OnSaveButton } from "../components/Buttons/onSaveButton.jsx";
import { deleteNotif } from "../utils/deleteNotification.js";

export default function Notifications() {
  const { accessToken } = useAuthStore();
  const { activeTheme } = useTheme();
  const { notifications, setAllNotifications, notifType, setNotifType } =
    useNotifStore();

  const [loading, setLoading] = useState(true);

  // DELETE HANDLER
  const handleDelete = async (id) => {
    await deleteNotif(id);
    setAllNotifications(notifications.filter((n) => n._id !== id));
  };

  useEffect(() => {
    if (!accessToken) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}notification/unseen`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

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
      className={`w-full pt-24 min-h-screen flex flex-col items-center transition-colors duration-300 px-4
        ${
          activeTheme === "light"
            ? "bg-gray-100 text-gray-900"
            : "bg-[#0d0d0d] text-gray-200"
        }
      `}
    >
      <div className="w-full max-w-3xl py-4 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
          Notifications
        </h1>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap justify-center sm:justify-start p-3 gap-3 sm:gap-5">
          <OnSaveButton text={"All"} onClick={() => setNotifType("all")} />
          <OnSaveButton text={"Job"} onClick={() => setNotifType("job")} />
          <OnSaveButton text={"Post"} onClick={() => setNotifType("post")} />
          <OnSaveButton text={"Message"} onClick={() => setNotifType("message")} />
        </div>

        {/* EMPTY STATE */}
        {notifications.length === 0 ? (
          <div className="text-center opacity-70 mt-10 text-sm sm:text-base">
            No notifications yet.
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5 mt-4">
            {notifications
              .filter((notif) => notifType === "all" || notif.type === notifType)
              .map((notif) => (
                <div
                  key={notif._id}
                  className={`relative p-4 sm:p-5 rounded-xl shadow transition-all border w-full
                    ${
                      activeTheme === "light"
                        ? "bg-white border-gray-200"
                        : "bg-[#1a1a1a] border-[#333]"
                    }
                  `}
                >
                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(notif._id)}
                    className="absolute top-2 right-2 text-xs px-2 py-1 rounded-md
                    bg-red-500/80 hover:bg-red-600 transition text-white"
                  >
                    Delete
                  </button>

                  {/* POST NOTIFICATION */}
                  {notif.type === "post" && (
                    <p className="text-sm sm:text-base leading-relaxed">
                      <span className="font-semibold">New post</span> from{" "}
                      {notif.from} you follow: “{notif.data.text}”
                    </p>
                  )}

                  {/* JOB NOTIFICATION */}
                  {notif.type === "job" && (
                    <p className="text-sm sm:text-base leading-relaxed">
                      <span className="font-semibold">New job posted:</span>{" "}
                      {notif.data.role} — {notif.data.companyName} (
                      {notif.data.location})
                    </p>
                  )}

                  {/* MESSAGE NOTIFICATION */}
                  {notif.type === "message" && (
                    <p className="text-sm sm:text-base leading-relaxed">
                      <span className="font-semibold">New message</span> from{" "}
                      {notif.from}
                    </p>
                  )}

                  {/* TIMESTAMP */}
                  <div className="text-[10px] sm:text-xs opacity-60 mt-2">
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