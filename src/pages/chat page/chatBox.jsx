import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/chatStore.js";
import { useUserStore } from "../../store/userStore.js";
import { NavbarProfileImage } from "../../components/profile image/navbarProfileImage.jsx";
import { getMessages } from "../../utils/getMessages.js";
import { useTheme } from "../../theme-provider.jsx";
import { IsLoadingSvg } from "../../components/loaders/isLoadingSvg.jsx";

export const ChatBox = ({ sidebarOpen, setSidebarOpen }) => {
  const {
    activeConversation,
    messages,
    chatParticipants,
    sendMessage,
    setPageNumber,
    setMessages,
    hasMore,
    setHasMore,
  } = useChatStore();

  const { user } = useUserStore();
  const { activeTheme } = useTheme();

  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const messagesTopRef = useRef(null);
  const [receiver, setReceiver] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const prevMessageCount = useRef(0);
  const isDark = activeTheme === "dark";

  useEffect(() => {
    if (messages.length > prevMessageCount.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessageCount.current = messages.length;
  }, [messages]);

  useEffect(() => {
    if (!receiver) return;
    setIsOnline(chatParticipants.has(receiver._id.toString()));
  }, [receiver, chatParticipants]);

  useEffect(() => {
    if (!activeConversation) return;
    setReceiver(
      activeConversation.participants.find(
        (p) => p._id.toString() !== user._id.toString()
      )
    );
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, 0);
  }, [activeConversation]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text, user._id, receiver._id);
    setText("");
  };

  useEffect(() => {
    if (!activeConversation || !messagesTopRef.current || !hasMore) return;
    let observer;
    let loading = false;

    const handleIntersect = async (entries) => {
      if (isLoading) return;
      setIsLoading(true);
      const entry = entries[0];
      if (entry.isIntersecting && !loading) {
        loading = true;

        const scrollContainer = messagesTopRef.current.parentElement;
        const oldScrollHeight = scrollContainer.scrollHeight;

        const res = await getMessages({
          conversationId: activeConversation._id,
        });
        if (res?.data?.info) {
          const [msgs, more] = res.data.info;
          setMessages(msgs);
          setHasMore(more);
          setPageNumber();

          const newScrollHeight = scrollContainer.scrollHeight;
          scrollContainer.scrollTop = newScrollHeight - oldScrollHeight;
        }

        loading = false;
        setIsLoading(false);
      }
    };

    observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 });
    observer.observe(messagesTopRef.current);
    return () => observer.disconnect();
  }, [activeConversation, messages.length, hasMore]);

  if (!activeConversation) {
    return (
      <div
        className={`flex flex-col gap-4 h-full items-center justify-center font-medium ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Select a chat to start messaging

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`md:hidden px-3 py-2 rounded-lg font-medium ${
            isDark
              ? "bg-zinc-800 hover:bg-zinc-700 text-white"
              : "bg-zinc-300 hover:bg-zinc-400 text-black"
          }`}
        >
          {sidebarOpen ? "Close" : "Chats"}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-3 font-semibold ${
          isDark ? "bg-zinc-900" : "bg-zinc-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <NavbarProfileImage profileImage={receiver.profileImage} />
          <div className="flex flex-col">
            <span>@{receiver.userName}</span>
            <span
              className={`text-sm flex items-center gap-1 ${
                isOnline ? "text-green-400" : "text-red-400"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`md:hidden px-3 py-2 rounded-lg font-medium ${
            isDark
              ? "bg-zinc-800 hover:bg-zinc-700 text-white"
              : "bg-zinc-300 hover:bg-zinc-400 text-black"
          }`}
        >
          {sidebarOpen ? "Close" : "Chats"}
        </button>
      </div>

      {/* Messages */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-2 ${
          isDark ? "bg-zinc-950" : "bg-gray-100"
        }`}
      >
        {isLoading && (
          <div className="text-center text-sm text-gray-400">
            <IsLoadingSvg />
          </div>
        )}
        <div ref={messagesTopRef}></div>

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.sender === user._id ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] wrap-break-word ${
                m.sender === user._id
                  ? isDark
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-500 text-white"
                  : isDark
                  ? "bg-zinc-800 text-gray-100"
                  : "bg-white text-gray-900 shadow-sm"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className={`p-3 border-t flex gap-2 ${
          isDark ? "bg-zinc-900 border-zinc-800" : "bg-gray-100 border-gray-300"
        }`}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`flex-1 px-3 py-2 rounded-lg outline-none border transition-colors ${
            isDark
              ? "bg-zinc-800 border-zinc-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-black placeholder-gray-500"
          }`}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isDark
              ? "bg-indigo-600 hover:bg-indigo-500 text-white"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};
