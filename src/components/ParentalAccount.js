// src/app/components/ParentalAccount.js

import { useState } from "react";

const ParentalAccount = ({ userId }) => {
  const [creationOption, setCreationOption] = useState(""); // 'new' o 'existing'

  const handleCreateAccount = async () => {
    const response = await fetch(
      "http://localhost:5000/api/parental-accounts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Cuenta parental creada:", data);
    } else {
      console.error("Error al crear la cuenta parental:", response.statusText);
    }
  };

  return (
    <div>
      <h2>Crea una Cuenta Parental</h2>
      <label>
        <input
          type="radio"
          value="new"
          checked={creationOption === "new"}
          onChange={() => setCreationOption("new")}
        />
        Crear una nueva cuenta parental
      </label>
      <label>
        <input
          type="radio"
          value="existing"
          checked={creationOption === "existing"}
          onChange={() => setCreationOption("existing")}
        />
        Usar un código de invitación
      </label>
      {creationOption === "new" && (
        <button onClick={handleCreateAccount}>Crear Cuenta Parental</button>
      )}
      {creationOption === "existing" && (
        <div>
          <input type="text" placeholder="Código de invitación" />
          <button>Usar Código</button>
        </div>
      )}
    </div>
  );
};

export default ParentalAccount;
