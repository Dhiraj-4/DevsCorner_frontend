import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/chatStore.js";
import { useUserStore } from "../../store/userStore.js";
import { NavbarProfileImage } from "../../components/profile image/navbarProfileImage.jsx";
import { getMessages } from "../../utils/getMessages.js";

export const ChatBox = () => {
  const { activeConversation, messages, chatParticipants,
     sendMessage, setPageNumber, setMessages, hasMore, setHasMore 
  } = useChatStore();

  const { user } = useUserStore();
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const messagesTopRef = useRef(null);
  const [receiver, setReceiver] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const prevMessageCount = useRef(0);

useEffect(() => {
  // Only auto-scroll if new messages were *added at the end* (not prepended)
  if (messages.length > prevMessageCount.current) {
    // Scroll only if last message isn't from self-fetch (older)
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  prevMessageCount.current = messages.length;
}, [messages]);

  
  useEffect(() => {
    if(!receiver) return;
    setIsOnline(chatParticipants.has(receiver._id.toString()));
  }, [receiver, chatParticipants]);

  
  useEffect(() => {
    if(!activeConversation) return;
    setReceiver(activeConversation.participants.find((p) => p._id.toString() !== user._id.toString()));
  },[activeConversation]);
  
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
    setIsLoading(true);
    const entry = entries[0];
    if (entry.isIntersecting && !loading) {
      loading = true;

      const scrollContainer = messagesTopRef.current.parentElement;
      const oldScrollHeight = scrollContainer.scrollHeight;

      console.log("🟢 Top reached — fetching older messages...");
      const res = await getMessages({ conversationId: activeConversation._id });
      if (res?.data?.info) {
        const [msgs, more] = res.data.info;
        setMessages(msgs); // prepend
        setHasMore(more);
        setPageNumber();

        // maintain scroll position
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
    return <div className="flex-1 text-white flex items-center justify-center">Select a chat</div>;
  }
  return (
    <div className="flex max-h-screen flex-col flex-1">

      <div className="p-3 flex items-center gap-2 font-bold cursor-pointer text-white bg-gray-900">
        <NavbarProfileImage profileImage={receiver.profileImage} />
        <span>
          @{ receiver.userName }

          <div>
            {isOnline ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full block"></span> Online
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-400 rounded-full block"></span> Offline
              </span>
            )}
          </div>
        </span>

      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3">
        {isLoading && <div className="text-center text-gray-400">Loading...</div>}
        <div ref={messagesTopRef} className="text-white"></div>
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