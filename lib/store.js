import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      email: null,
      setEmail: (email) => set({ email }),
    }),
    {
      name: "auth-storage", // localStorage key
      getStorage: () => localStorage, // make sure it's client-side
    }
  )
);
