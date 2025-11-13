import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore.js";
import { useChatStore } from "../../store/chatStore.js";
import { ChatBox } from "./chatBox.jsx";
import { getConversationsHandler } from "./utils/getConversationsHandler.js";
import { NavbarProfileImage } from "../../components/profile image/navbarProfileImage.jsx";
import { useTheme } from "../../theme-provider.jsx";

export const ChatPage = () => {
  const {
    connectSocket,
    conversations,
    setConversations,
    setActiveConversation,
    onlineMembers,
    activeConversation,
  } = useChatStore();

  const { user } = useUserStore();
  const { activeTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user?._id) connectSocket(user._id);

    async function fetchConversations() {
      const response = await getConversationsHandler();
      setConversations(response.conversations);
    }
    fetchConversations();
  }, [user]);

  const isDark = activeTheme === "dark";

  return (
    <div
      className={`flex flex-col h-[calc(100vh)]  pt-16 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Main Layout */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed md:static top-14 md:top-0 left-0 h-[calc(100vh-3.5rem)] md:h-full z-40 transform md:translate-x-0 transition-transform duration-300 w-64 md:w-1/3 border-r ${
            isDark
              ? "bg-zinc-900 border-zinc-800 text-white"
              : "bg-zinc-100 border-zinc-300 text-black"
          } ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          {/* Online header */}
          <div
            className={`p-4 font-semibold sticky top-0 z-10 text-center ${
              isDark ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black"
            }`}
          >
            Online members: {onlineMembers}
          </div>

          {/* Scrollable Conversations */}
          <div className="flex flex-col overflow-y-auto h-[calc(100%-3.5rem)]">
            {conversations.map((c) => {
              const participant = c.participants.find(
                (p) => p._id.toString() !== user._id.toString()
              );
              return (
                <div
                  key={c._id}
                  onClick={() => {
                    setActiveConversation(c);
                    setSidebarOpen(false);
                  }}
                  className={`p-3 flex items-center gap-3 font-medium cursor-pointer rounded-md ${
                    isDark
                      ? "hover:bg-zinc-800 text-white"
                      : "hover:bg-zinc-200 text-black"
                  } ${
                    activeConversation?._id === c._id
                      ? isDark
                        ? "bg-zinc-800"
                        : "bg-zinc-200"
                      : ""
                  }`}
                >
                  <NavbarProfileImage profileImage={participant.profileImage} />
                  <span className="truncate">@{participant.userName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ChatBox */}
        <div
          className={`flex-1 transition-all duration-300 overflow-hidden ${
            sidebarOpen ? "blur-sm pointer-events-none md:blur-0" : ""
          }`}
        >
          <ChatBox sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>
    </div>
  );
};
