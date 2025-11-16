// store/useChatStore.js
import { create } from "zustand";
import { io } from "socket.io-client";
import { getMessages } from "../utils/getMessages.js";
import { SOCKET_URL } from "../../config/envConfig.js";
import { useUserStore } from "./userStore.js";
import { useAuthStore } from "./authStore.js";

export const useChatStore = create((set, get) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  
  messages: [],
  setMessages: (newMessages, replace = false) => {
    console.log("📨 setMessages called", newMessages);
    if (replace) {
      set({ messages: newMessages.reverse() });
    } else {
      set({ messages: [...newMessages.reverse(), ...get().messages] });
    }
  },

  activeConversation: null,
  conversations: [],
  onlineMembers: 0,
  setOnlineMembers: (number) => set({ onlineMembers: number }),
  setConversations: (array) => set({ conversations: array }),
  isConnected: false,
  pageNumber: 1,
  setPageNumber: () => set({ pageNumber: get().pageNumber + 1 }),
  reset_pageNumber: () => set({ pageNumber: 1 }), 

  hasMore: true,
  setHasMore: (bool) => set({ hasMore: bool }),

  chatParticipants: new Set(),

  setChatParticipants: (participants) => set({ chatParticipants: new Set(participants) }),

  isParticipantOnline: (receiverId) => {
    return get().chatParticipants.has(receiverId);
  },

  resetChatStore: () => {
    get().socket?.emit("logout");
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
    const { accessToken } = useAuthStore.getState();

    const socket = io(`${SOCKET_URL}`, {
      withCredentials: true,
      query: { userId, accessToken }
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

    socket.on("authError", (response) => {
      console.log(response.message);
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

    socket.on("notification:newJob", (payload) => {
      console.log("notification recived:", payload);
    });

    set({ socket });
  },

  setActiveConversation: async (conversation) => {
    set({ activeConversation: conversation, messages: [], pageNumber: 1, hasMore: true });
    const res = await getMessages({ conversationId: conversation._id });
    if (res?.data?.info) {
      const [msgs, more] = res.data.info;
      set({ hasMore: more });
      get().setMessages(msgs, true); // replace = true
    }
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