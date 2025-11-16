import { create } from "zustand";
import { BACKEND_URL } from "../../config/envConfig.js";
import axios from "axios";
import { useAuthStore } from "./authStore.js";
import { refreshToken } from "../utils/refreshToken.js";
import { logoutHelper } from "../utils/logoutHelper.js";

export const useUserStore = create((set, get) => ({
  user: {
    _id: "",
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
    socialLinks: {},
    resume: "",
    companyName: "",
  },
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  setUser: (newUser) => set({ user: newUser }),
  updateUser: (updates) =>
    set((state) => ({ user: { ...state.user, ...updates } })),
  hydrateUser: async () => {
    const {
        accessToken,
        setIsLoading
    } = useAuthStore.getState();
    
    try{
    setIsLoading(true);
    const response = await axios.get(`${BACKEND_URL}user/me`, {
    headers: {
    Authorization: `Bearer ${accessToken}`, // standard convention
    },
    });
    console.log(response.data.info);
    set({ user: response.data.info });
    }catch(err) {
      console.log(err);
      if(err.status == 401) {
        let res = await refreshToken();
        if(res) await get().hydrateUser();
      }else if(err.status == 404) {
        logoutHelper();
      }
    } finally {
      setIsLoading(false);
    }
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
        socialLinks: {},
        resume: "",
        companyName: "",
      },
    }),
}));