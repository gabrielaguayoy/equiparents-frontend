// src/components/InviteParentForm.js

"use client";

import { useState } from "react";
import formStyles from "../../../styles/formStyles";

const InviteParentForm = ({ onCancel }) => {
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invite-parent`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: parentName, email }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo enviar la invitación.");
      }

      alert("✅ Invitación enviada con éxito.");
      onCancel();
    } catch (error) {
      console.error("❌ Error al enviar la invitación:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <h3>Invitar a otro progenitor</h3>
      <input
        type="text"
        placeholder="Nombre del progenitor"
        value={parentName}
        onChange={(e) => setParentName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Enviar Invitación</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

export default InviteParentForm;
