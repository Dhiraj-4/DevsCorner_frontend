import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLoginStore = create( (set,get) => ({

    identifier: '',
    setIdentifier: (identifier) => set({ identifier }),
    
    password: '',
    setPassword: (passwd) => set({ password: passwd }),

    passwordShow: false,
    setPasswordShow: (bool) => set({ passwordShow: bool }),

    isLoading: false,
    setIsLoading: (bool) => set({ isLoading: bool }),

    error: null,
    setError: (error) => set({ error }),
    clearError: () => set({ error: null })
}))