import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
  roles: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      login: (token: string, user: User) =>
        set({ isAuthenticated: true, token, user }),
      logout: () => set({ isAuthenticated: false, token: null, user: null }),
      updateUser: (user: User) => set((state) => ({ ...state, user })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
