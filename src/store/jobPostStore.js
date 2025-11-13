import { create } from "zustand";

export const useJobStore = create((set,get) => ({

    isLoading: false,
    setIsLoading: (bool) => set({ isLoading: bool }),
    
    allJobsArray: [],
    setAllJobs: (jobs) => set(() => ({ allJobsArray: [...get().allJobsArray, ...jobs] })),

    myJobsArray: [],
    setMyJobs: (jobs) => set(() => ({ myJobsArray: [...get().myJobsArray, ...jobs] })),

    pageNumber: 1,
    setPageNumber: () => set({ pageNumber: get().pageNumber + 1 }),

    role: "",
    setRole: (role) => set({ role }),

    companyName: "Indie",
    setCompanyName: (name) => set({ companyName: name }),

    applyLink: "",
    setApplyLink: (link) => set({ applyLink: link }),

    text: "",
    setText: (text) => set({ text }),

    location: "",
    setLocation: (location) => set({ location }),

    locationType: "",
    setLocationType: (type) => set({ locationType: type }),

    salary: "",
    setSalary: (salary) => set({ salary }),

    experience: "",
    setExperience: (experience) => set({ experience }),

    hasMore: true,
    setHasMore: (bool) => set({ hasMore: bool }),

    reset_jobStore: () => {
        set({
            applyLink: "",
            pageNumber: 1,
            text: "",
            companyName: "",
            role: "",
            allJobsArray: [],
            myJobsArray: [],
            hasMore: true,
        });
    }
}));