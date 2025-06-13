import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-70 z-40"></div>

      {/* Modal Box */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      bg-gray-900 text-white z-50 w-[90%] h-[90%] rounded-lg shadow-lg p-6 overflow-auto">

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            className="text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-lg"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          {children}
        </div>
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
