// src/app/dashboard/ChildList.js

import React, { useState } from "react";
import useFetchChildren from "../../hooks/useFetchChildren";
import ChildCard from "../../components/ChildCard";
import ChildForm from "../../components/ChildForm"; // Importar el formulario

const ChildList = () => {
  const token = localStorage.getItem("token");
  const { children, loading, error, refetch } = useFetchChildren(token); // ✅ Agregar refetch para actualizar datos
  const [showForm, setShowForm] = useState(false); // Controla la visibilidad del formulario

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleChildAdded = () => {
    refetch(); // ✅ Recargar lista de hijos tras agregar uno nuevo
    setShowForm(false); // ✅ Cerrar el formulario después de agregar
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Hijos</h2>

      {children.length === 0 ? (
        <p>No hay hijos asociados a esta cuenta.</p>
      ) : (
        <div className="child-list">
          {children.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      )}

      {/* Botón para mostrar/ocultar el formulario */}
      <button onClick={toggleForm} style={styles.addButton}>
        {showForm ? "Cancelar" : "Agregar hijo"}
      </button>

      {/* Renderiza el formulario solo si `showForm` es `true` */}
      {showForm && (
        <ChildForm onChildAdded={handleChildAdded} onCancel={toggleForm} />
      )}
    </div>
  );
};

const styles = {
  addButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default ChildList;
