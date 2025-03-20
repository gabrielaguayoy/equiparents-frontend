// src/app/dashboard/components/ChildEditForm.js
"use client";

import { useState, useEffect } from "react";
import formStyles from "../../../styles/formStyles"; // ✅ Se usa el estilo global

const ChildEditForm = ({ child, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: child.name || "",
    dateOfBirth: child.dateOfBirth
      ? new Date(child.dateOfBirth).toISOString().split("T")[0] // ✅ Convertir formato
      : "",
  });
  const [error, setError] = useState("");

  /**
   * 📌 Cargar datos cuando el hijo cambia
   */
  useEffect(() => {
    setFormData({
      name: child.name || "",
      dateOfBirth: child.dateOfBirth
        ? new Date(child.dateOfBirth).toISOString().split("T")[0] // ✅ Asegurar compatibilidad con input[type="date"]
        : "",
    });
  }, [child]);

  /**
   * 📌 Maneja cambios en los inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * 📌 Maneja la actualización del hijo
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formattedDate = new Date(formData.dateOfBirth).toISOString(); // ✅ Convertir a ISO-8601

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/children/${child.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: formData.name,
            dateOfBirth: formattedDate, // ✅ Se envía en formato correcto
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al actualizar hijo");
      }

      console.log("✅ Hijo actualizado con éxito");
      onUpdate();
      onCancel();
    } catch (error) {
      console.error("❌ Error al actualizar hijo:", error);
      setError(error.message);
    }
  };

  return (
    <div style={formStyles.container}>
      <h2>Editar Hijo</h2>
      {error && <p style={formStyles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
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
          Guardar Cambios
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

export default ChildEditForm;
