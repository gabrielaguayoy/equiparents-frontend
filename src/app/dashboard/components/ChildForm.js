// src/src/components/ChildForm.js
"use client";

import { useState } from "react";
import formStyles from "../../../styles/formStyles"; // ✅ Se importan los estilos centralizados
import { useAuth } from "../../../context/AuthContext";

const ChildForm = ({ onChildAdded, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: "", dateOfBirth: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.dateOfBirth) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/children`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: formData.name,
            dateOfBirth: formData.dateOfBirth,
            parentalAccountId: user.parentalAccountId,
            userId: user.id,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "No se pudo agregar el hijo.");
      }

      console.log("✅ Hijo agregado exitosamente");
      setFormData({ name: "", dateOfBirth: "" });
      onChildAdded?.(); // ✅ Se usa opcionalmente para evitar el error si no está definido
      onCancel?.(); // ✅ Se usa opcionalmente para evitar el error si no está definido
    } catch (error) {
      console.error("❌ Error al agregar hijo:", error);
      setError(error.message);
    }
  };

  return (
    <div style={formStyles.container}>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <h2>Agregar Hijo</h2>
        {error && <p style={formStyles.error}>{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Nombre del hijo"
          value={formData.name}
          onChange={handleChange}
          required
          style={formStyles.input}
        />

        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          style={formStyles.input}
        />

        <button type="submit" style={formStyles.button}>
          Agregar
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={formStyles.cancelButton}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ChildForm;
