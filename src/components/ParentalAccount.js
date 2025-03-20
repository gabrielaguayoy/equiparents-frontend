// src/app/components/ParentalAccount.js

import { useState } from "react";
import formStyles from "../styles/formStyles"; // Importa los estilos

const ParentalAccount = ({ userId, onAccountCreated }) => {
  const [creationOption, setCreationOption] = useState(""); // 'new' o 'existing'
  const [invitationCode, setInvitationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/parental-accounts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la cuenta parental.");
      }

      const data = await response.json();
      console.log("✅ Cuenta parental creada:", data);
      onAccountCreated(data); // Llamar a la función para actualizar la UI
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUseInvitation = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/parental-accounts/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, invitationCode }),
        }
      );

      if (!response.ok) {
        throw new Error("Código de invitación inválido o expirado.");
      }

      const data = await response.json();
      console.log("✅ Cuenta parental unida:", data);
      onAccountCreated(data);
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <h2 style={styles.title}>Cuenta Parental</h2>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="accountOption"
            value="new"
            checked={creationOption === "new"}
            onChange={() => setCreationOption("new")}
          />
          Crear una nueva cuenta parental
        </label>
        <label>
          <input
            type="radio"
            name="accountOption"
            value="existing"
            checked={creationOption === "existing"}
            onChange={() => setCreationOption("existing")}
          />
          Usar un código de invitación
        </label>
      </div>

      {creationOption === "new" && (
        <button
          onClick={handleCreateAccount}
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Cuenta Parental"}
        </button>
      )}

      {creationOption === "existing" && (
        <div style={styles.inviteContainer}>
          <input
            type="text"
            placeholder="Código de invitación"
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value)}
            required
            style={styles.input}
          />
          <button
            onClick={handleUseInvitation}
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Verificando..." : "Usar Código"}
          </button>
        </div>
      )}
    </form>
  );
};

export default ParentalAccount;
