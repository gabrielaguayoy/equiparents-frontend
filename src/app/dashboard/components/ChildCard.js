// src/app/components/ChildCard.js
"use client";

import { FaEdit, FaTimes } from "react-icons/fa";
import "../../../styles/cardStyles.css";

const ChildCard = ({ child, onEdit, onDelete }) => {
  if (!child) return null;

  const formattedDate = child.dateOfBirth
    ? new Date(child.dateOfBirth).toLocaleDateString()
    : "Fecha desconocida";

  return (
    <div className="card">
      <div className="card-header">
        <button
          onClick={() => {
            console.log("✏️ Editando hijo:", child);
            onEdit(child);
          }}
          className="icon-button"
          aria-label="Editar"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => {
            console.log("🗑️ Eliminando hijo:", child);
            onDelete(child.id);
          }}
          className="icon-button"
          aria-label="Eliminar"
        >
          <FaTimes />
        </button>
      </div>
      <h3>{child.name}</h3>
      <p>
        <strong>Fecha de Nacimiento:</strong> {formattedDate}
      </p>
    </div>
  );
};

export default ChildCard;
