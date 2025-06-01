import { create } from "zustand";

export const useAuthStore = create((set) => ({
  registeredEmail: "",
  setRegisteredEmail: (email) => set({ registeredEmail: email }),
}));
