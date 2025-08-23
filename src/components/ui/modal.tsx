import { CircleX } from "lucide-react";
import React from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/75"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md h-auto max-h-11/12 mx-auto bg-white rounded-xl shadow-xl overflow-auto transform transition-all sm:p-6 p-4 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition duration-200"
          >
            <CircleX />
          </button>
        </div>

        <div className="pt-6">{children}</div>
      </div>
    </div>
  );
}
