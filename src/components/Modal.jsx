import { useAlertStore } from "../store/alertStore";
import React from "react";
// import { X } from 'lucide-react';
// import { useAlertStore } from '@/store/alertStore';

export default function Modal({ children }) {
  const hideModal = useAlertStore((state) => state.hideModal);
  return (
    <div className="inset-0 backdrop-blur-lg bg-black/30 z-30 fixed flex items-center justify-center p-5">
      <div onClick={hideModal} className="absolute size-full"></div>
      <div className="w-full">
        <div className="z-40 flex flex-col items-center justify-center relative">
          {children}
          <p onClick={hideModal} className="absolute -top-5 right-0 text-red-500 text-2xl bg-red">
            x
          </p>
        </div>
      </div>
    </div>
  );
}
