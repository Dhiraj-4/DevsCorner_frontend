// store/useChatStore.js
import { create } from "zustand";
import { io } from "socket.io-client";
import { getMessages } from "../utils/getMessages.js";
import { SOCKET_URL } from "../../config/envConfig.js";
import { useUserStore } from "./userStore.js";

export const useChatStore = create((set, get) => ({
  socket: null,
  messages: [],
  activeConversation: null,
  conversations: [],
  setConversations: (array) => set({ conversations: array }),
  isConnected: false,

  resetChatStore: () => {
    set({
      socket: null,
      message: [],
      activeConversation: null,
      conversations: [],
      isConnected: false
    });
  },
  // connect socket
  connectSocket: (userId) => {
    const socket = io(`${SOCKET_URL}`, {
      withCredentials: true,
      query: { userId },
    });
    
    socket.on("connect", () => {
      console.log("Connected to socket server");
      set({ isConnected: true });
    });

    socket.on("receiveMessage", async (message) => {
  const { activeConversation, conversations } = get();
  console.log(message, "receiveMessage");

  if (message.conversationId === activeConversation?._id) {
    // belongs to active conversation → just append message
    set({ messages: [...get().messages, message] });
  } else {
     const { hydrateUser } = useUserStore.getState();
     await hydrateUser();
    }
  });


    set({ socket });
  },

  setActiveConversation: async (conversation) => {
    set({ activeConversation: conversation, messages: [] });
    let res = await getMessages({conversationId: conversation._id});

    set({ messages: res.data.info[0] });
  },

  sendMessage: (text, senderId, receiverId) => {
    const { socket, activeConversation } = get();
    if (!socket || !activeConversation) return;

    const messageData = {
      conversationId: activeConversation._id,
      sender: senderId,
      receiver: receiverId,
      text,
    };

    socket.emit("sendMessage", messageData);
    set({ messages: [...get().messages, messageData] });
  },
}));