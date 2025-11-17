import { create } from "zustand";

export const useNotifStore = create((set, get) => ({
  notifications: [],

  notifType: "all",
  setNotifType: (type) => set({ notifType: type }),

  isLoading: false,
  setIsLoading: (bool) => set({ isLoading: bool }),

  // append (socket)
  addNotification: (notif) =>
    set({ notifications: [notif, ...get().notifications] }),

  // replace (API fetch)
  setAllNotifications: (array) =>
    set({ notifications: array }),

  resetNotifications: () => set({ notifications: [] })
}));