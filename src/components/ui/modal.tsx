import { CircleX } from "lucide-react";
import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      // Click on backdrop to close the modal
      onClick={onClose}
    >
      {/* Modal container with background and shadow */}
      <div
        className="relative w-full max-w-lg mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all sm:p-6 p-4"
        // Stop click propagation to prevent closing when clicking inside the modal
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          {/* Close button with an inline SVG 'X' icon from lucide-react */}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition duration-200"
          >
            <CircleX />
          </button>
        </div>

        {/* Modal Content */}
        <div className="py-6">{children}</div>
      </div>
    </div>
  );
}
