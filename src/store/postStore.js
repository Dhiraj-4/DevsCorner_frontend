import { create } from "zustand";

export const usePostStore = create((set,get) => ({
    postsArray: [],
    setPosts: (posts) => set(() => ({ postsArray: [...get().postsArray, ...posts] })),

    pageNumber: 1,
    setPageNumber: () => set({ pageNumber: get().pageNumber + 1 }),

    text: "",
    setText: (text) => set({ text }),

    isLoading: false,
    setIsLoading: (bool) => set({ isLoading: bool }),

    hasMore: true,
    setHasMore: (bool) => set({ hasMore: bool }),

    reset_postStore: () => {
        set({
            pageNumber: 1,
            text: "",
            postsArray: [],
            hasMore: true
        });
    }
}));