// src/app/components/AccountModal.js
import React, { useState, useEffect } from "react";

const AccountModal = ({ onClose, onCreateAccount }) => {
  const [accountOption, setAccountOption] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accountOption === "new") {
      onCreateAccount(null);
    } else if (accountOption === "code" && inviteCode) {
      onCreateAccount(inviteCode);
    }
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Crear Cuenta Parental</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="radio"
              name="accountOption"
              value="new"
              checked={accountOption === "new"}
              onChange={(e) => setAccountOption(e.target.value)}
            />
            Crear nueva cuenta parental
          </label>
          <label>
            <input
              type="radio"
              name="accountOption"
              value="code"
              checked={accountOption === "code"}
              onChange={(e) => setAccountOption(e.target.value)}
            />
            Usar código de invitación
          </label>
          {accountOption === "code" && (
            <input
              type="text"
              placeholder="Código de invitación"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              required
            />
          )}
          <button type="submit">Confirmar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "15px",
  },
  option: {
    textAlign: "left",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    flex: 1,
    marginRight: "5px",
  },
  cancelButton: {
    padding: "10px",
    backgroundColor: "#D57E5A",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    flex: 1,
  },
};

export default AccountModal;
