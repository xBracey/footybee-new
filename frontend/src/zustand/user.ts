import { create } from "zustand";

interface UserStore {
  token: string;
  setToken: (token: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  token: "",
  setToken: (token: string) => set({ token }),
}));
