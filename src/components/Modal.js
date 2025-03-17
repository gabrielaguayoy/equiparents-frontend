// src/app/components/Modal.js

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // No renderizar el modal si no está abierto

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <button onClick={onClose}>Cerrar</button>
        {children}
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 500px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Modal;
