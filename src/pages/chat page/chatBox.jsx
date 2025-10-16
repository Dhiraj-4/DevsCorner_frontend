import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/chatStore.js";
import { useUserStore } from "../../store/userStore.js";

export const ChatBox = () => {
  const { activeConversation, messages, sendMessage } = useChatStore();
  const { user } = useUserStore();
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  if (!activeConversation) {
    return <div className="flex-1 text-white flex items-center justify-center">Select a chat</div>;
  }

  const receiver = activeConversation.participants.find((p) => p._id !== user._id);
  
  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text, user._id, receiver._id);
    setText("");
  };
  return (
    <div className="flex flex-col flex-1">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${
              m.sender === user._id ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                m.sender === user._id ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex text-white">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};