import { create } from "zustand";

export const useAlertStore = create((set, get) => ({

  modal: {
    visible: false,
    content: null,
  },

  showModal(content) {
    set({ modal: { content: content, visible: true } });
  },

  hideModal() {
    set({ modal: { content: null, visible: false } });
  },
}));
