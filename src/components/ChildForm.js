// src/src/components/ChildForm.js

"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ChildForm = ({ onCancel, onChildAdded }) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.parentalAccountId) {
      console.error("❌ No se encontró una cuenta parental.");
      return;
    }

    const formattedDate = new Date(dateOfBirth).toISOString(); // ✅ Convertir a formato ISO

    const childData = {
      name,
      dateOfBirth: formattedDate, // ✅ Ahora se envía en formato correcto
      parentalAccountId: user.parentalAccountId,
      userId: user.id,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/children`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(childData),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo agregar el hijo");
      }

      console.log("✅ Hijo agregado exitosamente");
      setName("");
      setDateOfBirth("");
      onChildAdded(); // 🚀 Recargar la lista de hijos
      onCancel();
    } catch (error) {
      console.error("❌ Error al agregar hijo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Agregar Hijo</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "300px",
    marginTop: "10px",
  },
};

export default ChildForm;
