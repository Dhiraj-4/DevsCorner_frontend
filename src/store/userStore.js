import { create } from "zustand";
import { BACKEND_URL } from "../../config/envConfig.js";
import axios from "axios";
import { useAuthStore } from "./authStore.js";

export const useUserStore = create((set) => ({
  user: {
    userName: "",
    fullName: "",
    skills: [],
    followers: [],
    following: [],
    countFollowers: 0,
    countFollowing: 0,
    email: "",
    profileImage: "",
    bio: "",
    location: "",
    website: "",
    socialLinks: [],
    resume: "",
    companyName: "",
  },
  setUserName: (usrName) => set({ userName: usrName }),
  setUser: (newUser) => set({ user: newUser }),
  updateUser: (updates) =>
    set((state) => ({ user: { ...state.user, ...updates } })),
  hydrateUser: async () => {
    const {
        accessToken
    } = useAuthStore.getState();
    const response = await axios.get(`${BACKEND_URL}user/me`, {
    headers: {
    Authorization: `Bearer ${accessToken}`, // standard convention
    },
    });
    console.log(response.data.info);
    set({ user: response.data.info });
  },
  clearUser: () =>
    set({
      user: {
        userName: "",
        fullName: "",
        skills: [],
        countFollowers: 0,
        countFollowing: 0,
        followers: [],
        following: [],
        email: "",
        profileImage: "",
        bio: "",
        location: "",
        website: "",
        socialLinks: [],
        resume: "",
        companyName: "",
      },
    }),
}));