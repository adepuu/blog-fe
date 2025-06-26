import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthResponse, User } from "../../../types/data";

interface AuthStore {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    setAccessToken: (accessToken: string | null) => void;
    setRefreshToken: (refreshToken: string | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    login: (credentials: AuthResponse) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
}


export const useAuthStore = create(persist<AuthStore>((set, get) => ({
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAuthenticated: false,
    setAccessToken: (accessToken: string | null) => set({ accessToken }),
    setRefreshToken: (refreshToken: string | null) => set({ refreshToken }),
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    login: async (credentials: AuthResponse) => {
        console.log(credentials)
        set({
            user: credentials.user,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
            isAuthenticated: true
        })
    },
    logout: () => set({ accessToken: null, refreshToken: null, isAuthenticated: false }),
    setUser: (user: User | null) => set({ user }),
}), { name: "auth", storage: createJSONStorage(() => localStorage) }));
