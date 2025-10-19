import { useEffect } from "react";
import { useUserStore } from "../../store/userStore.js";
import { useChatStore } from "../../store/chatStore.js";
import { ChatBox } from "./chatBox.jsx";
import { getConversationsHandler } from "./utils/getConversationsHandler.js";
import { NavbarProfileImage } from "../../components/profile image/navbarProfileImage.jsx";

export const ChatPage = () => {
  const { connectSocket, conversations,
     setConversations, setActiveConversation, onlineMembers
  } = useChatStore();

  const { user } = useUserStore();

  useEffect(() => {
    if (user?._id) connectSocket(user._id);
    
    async function fetchConversations() {
      const response = await getConversationsHandler();
      setConversations(response.conversations);
    }
    fetchConversations();
  }, [user]);
  
  return (
    <div className="flex flex-col">
    <div className="flex h-screen pt-20">
      {/* Sidebar */}
      <div className="w-1/3 border-r">
          <div className="p-5 bg-gray-500 font-bold text-white">Online members: {onlineMembers}</div>
        {conversations.map((c) => (
          <div
            key={c._id}
            onClick={() => setActiveConversation(c)}
            className="p-3 flex items-center gap-2 font-bold hover:bg-gray-950 cursor-pointer text-white bg-gray-900"
          >
            <NavbarProfileImage profileImage={c.participants
              .filter((p) => p._id.toString() !== user._id.toString())
              .map((p) => p.profileImage)} />
            @{c.participants
              .filter((p) => p._id.toString() !== user._id.toString())
              .map((p) => p.userName)
            }
          </div>
        ))}
      </div>

      {/* Main Chat */}
      <ChatBox />
    </div>
    </div>
  );
};