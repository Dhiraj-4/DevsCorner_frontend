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
  onlineMembers: 0,
  setOnlineMembers: (number) => set({ onlineMembers: number }),
  setConversations: (array) => set({ conversations: array }),
  isConnected: false,
  pageNumber: 1,
  setPageNumber: () => set({ pageNumber: get().pageNumber + 1 }),
  reset_pageNumber: () => set({ pageNumber: 1 }), 

  chatParticipants: new Set(),

  setChatParticipants: (participants) => set({ chatParticipants: new Set(participants) }),

  isParticipantOnline: (receiverId) => {
    return get().chatParticipants.has(receiverId);
  },

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

    socket.on("onlineParticipants", (participants) => {
      set({ chatParticipants: new Set(participants) });
    });

    socket.on("userJoinedChat", (userId) => {
      set((state) => {
        const updated = new Set(state.chatParticipants);
        updated.add(userId);
        return { chatParticipants: updated };
      });
    });

    socket.on("userLeftChat", (userId) => {
      set((state) => {
        const updated = new Set(state.chatParticipants);
        updated.delete(userId);
        return { chatParticipants: updated };
      });
    });


    socket.on("receiveMessage", async (message) => {
      const { activeConversation } = get();
      console.log(message, "receiveMessage");

      if (message.conversationId === activeConversation?._id) {
        // belongs to active conversation → just append message
        set({ messages: [...get().messages, message] });
      } else {
         const { hydrateUser } = useUserStore.getState();
         await hydrateUser();
      }
    });

    socket.on("onlineMembers", (onlineNumber) => {
      set({ onlineMembers: onlineNumber });
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
  }

}));