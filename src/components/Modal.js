// src/app/components/Modal.js

import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose(); // Cerrar modal con la tecla ESC
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✖
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: ${isOpen ? "1" : "0"};
          visibility: ${isOpen ? "visible" : "hidden"};
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 500px;
          max-width: 90%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          position: relative;
          animation: fadeIn 0.3s ease-out;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
        }
        .modal-body {
          margin-top: 15px;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
        @keyframes fadeIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;
