import { create } from "zustand";

export const useJobStore = create((set,get) => ({
    role: "",
    setRole: (role) => set({ role }),

    companyName: "indie",
    setCompanyName: (name) => set({ companyName: name }),

    applyLink: "",
    setApplyLink: (link) => set({ applyLink: link }),

    text: "",
    setText: (text) => set({ text })
}));