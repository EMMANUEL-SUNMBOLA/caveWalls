import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ error: error.message });
        return { authenticated: false, message: error.message };
      }

      set({
        isAuthenticated: true,
        user: data.user,
      });

      return { authenticated: true, message: "Signed in successfully" };
    } catch (err) {
      set({ error: err.message });
      return { authenticated: false, message: err.message };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();

    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
