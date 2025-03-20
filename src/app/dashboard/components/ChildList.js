// src/app/dashboard/ChildList.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import ChildCard from "./ChildCard";
import "../../../styles/cardListStyles.css";

const ChildList = ({ onEditChild }) => {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 📌 Obtiene la lista de hijos desde la API
   */
  const fetchChildren = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/children?parentalAccountId=${user.parentalAccountId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al obtener hijos");

      const data = await response.json();
      setChildren(data.data);
    } catch (error) {
      console.error("❌ Error al cargar hijos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, [user]);

  /**
   * 📌 Maneja la eliminación de un hijo
   */
  const handleDeleteChild = async (childId) => {
    console.log("🗑️ Eliminando hijo con ID:", childId);
    if (!confirm("¿Seguro que deseas eliminar este hijo?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/children/${childId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar el hijo");

      console.log("✅ Hijo eliminado");
      setChildren((prevChildren) =>
        prevChildren.filter((c) => c.id !== childId)
      );
    } catch (error) {
      console.error("❌ Error al eliminar hijo:", error);
    }
  };

  /**
   * 📌 Maneja la edición de un hijo
   */
  const handleEditChild = (child) => {
    console.log("✏️ Editando hijo:", child);
    onEditChild(child); // ✅ Se pasa el hijo a `ParentDashboard.js`
  };

  if (isLoading) return <p>⏳ Cargando hijos...</p>;

  return (
    <div>
      <h2>Lista de Hijos</h2>
      {children.length > 0 ? (
        <div className="child-grid">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              onEdit={() => handleEditChild(child)}
              onDelete={() => handleDeleteChild(child.id)}
            />
          ))}
        </div>
      ) : (
        <p>No hay hijos registrados.</p>
      )}
    </div>
  );
};

export default ChildList;
