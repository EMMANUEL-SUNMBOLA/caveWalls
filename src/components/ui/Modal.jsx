import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useAlertStore } from "@/store/alertStore";

export default function Modal({ children }) {
  const hideModal = useAlertStore((state) => state.hideModal);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") hideModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [hideModal]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300">
      {/* High-quality Glass Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-zoom-out"
        onClick={hideModal}
      />

      {/* Close Button: Floating Top Right */}
      <button
        onClick={hideModal}
        className="absolute top-6 right-6 z-[110] p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all text-white border border-white/10"
      >
        <X size={24} />
      </button>

      {/* Content Container */}
      <div className="relative z-[105] max-w-7xl max-h-full flex items-center justify-center animate-in zoom-in-95 duration-300">
        <div className="rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 bg-zinc-900">
          {children}
        </div>
      </div>
    </div>
  );
}
