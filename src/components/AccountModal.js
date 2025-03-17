// src/app/components/AccountModal.js

import React, { useState } from "react";

const AccountModal = ({ onClose, onCreateAccount }) => {
  const [accountOption, setAccountOption] = useState("");

  const handleOptionChange = (e) => {
    setAccountOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accountOption) {
      onCreateAccount(accountOption); // Llama a la función que maneja la creación de cuenta
    }
  };

  return (
    <div className="modal">
      <h2>Crear Cuenta Parental</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="new"
              checked={accountOption === "new"}
              onChange={handleOptionChange}
            />
            Crear nueva cuenta parental
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="code"
              checked={accountOption === "code"}
              onChange={handleOptionChange}
            />
            Usar código de invitación
          </label>
        </div>
        <button type="submit">Confirmar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default AccountModal;
