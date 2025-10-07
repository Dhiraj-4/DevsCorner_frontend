import { create } from "zustand";

export const useJobStore = create((set,get) => ({
    jobsArray: [],
<<<<<<< HEAD
    setJobs: (jobs) => set((state) => ({ jobsArray: [...state.jobsArray, ...jobs] })),
=======
    setJobs: (jobs) => set(() => ({ jobsArray: [...get().jobsArray, ...jobs] })),
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)

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

<<<<<<< HEAD
    resetJobStore: () => {
        set({
            applyLink: "",
=======
    reset_jobStore: () => {
        set({
            applyLink: "",
            pageNumber: 1,
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
            text: "",
            companyName: "",
            role: "",
            jobsArray: []
        });
    }
}));