import { create } from "zustand";

export const useCommentStore = create((set,get) => ({
    commentsArray: [],
    setComments: (comments) => set(() => ({ commentsArray: [...get().commentsArray, ...comments] })),

    addComment: (comment) => set(() => ({commentsArray: [...get().commentsArray, comment]})),

    pageNumber: 1,
    setPageNumber: () => set({ pageNumber: get().pageNumber + 1 }),
    
    text: "",
    setText: (text) => set({ text }),

    isLoading: false,
    setIsLoading: (bool) => set({ isLoading: bool }),

    hasMore: true,
    setHasMore: (bool) => set({ hasMore: bool }),

    reset_commentStore: () => {
        set({
            pageNumber: 1,
            text: "",
            commentsArray: [],
            hasMore: true
        });
    }
}));