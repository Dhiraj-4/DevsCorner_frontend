import { useEffect } from "react";
import { useUserStore } from "../../store/userStore.js";
import { useChatStore } from "../../store/chatStore.js";
import { ChatBox } from "./chatBox.jsx";
import { getConversationsHandler } from "./utils/getConversationsHandler.js";

export const ChatPage = () => {
  const { connectSocket, conversations, setConversations, setActiveConversation } = useChatStore();
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
    <div className="flex h-screen pt-28">
      {/* Sidebar */}
      <div className="w-1/3 border-r">
        {conversations.map((c) => (
          <div
            key={c._id}
            onClick={() => setActiveConversation(c)}
            className="p-3 hover:bg-gray-950 cursor-pointer text-white bg-gray-900"
          >
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
  );
};