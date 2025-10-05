import { create } from "zustand";

export const useJobStore = create((set,get) => ({
    jobsArray: [],
    setJobs: (jobs) => set((state) => ({ jobsArray: [...state.jobsArray, ...jobs] })),

    pageNumber: 1,
    setPageNumber: (num) => set({ pageNumber: num }),

    role: "",
    setRole: (role) => set({ role }),

    companyName: "Indie",
    setCompanyName: (name) => set({ companyName: name }),

    applyLink: "",
    setApplyLink: (link) => set({ applyLink: link }),

    text: "",
    setText: (text) => set({ text }),

    resetJobStore: () => {
        set({
            applyLink: "",
            text: "",
            companyName: "",
            role: "",
            jobsArray: []
        });
    }
}));