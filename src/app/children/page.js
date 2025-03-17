// src/app/children/page.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Importar contexto de autenticación
import ChildCard from "../../components/ChildCard"; // Componente para mostrar información del hijo
import { useRouter } from "next/navigation"; // Para la navegación

const ChildrenPage = () => {
  const { user, loading } = useAuth(); // Obtener estado de autenticación
  const [children, setChildren] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Redirigir si no hay usuario autenticado
    if (!user) {
      router.push("/login");
    } else {
      fetchChildren(); // Llamar a la función para obtener hijos
    }
  }, [loading, user, router]);

  const fetchChildren = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/children`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener hijos"); // Lanzar error si la respuesta no fue exitosa
      }

      const data = await response.json();
      setChildren(data.data || data); // Asegúrate que está de acuerdo con tu respuesta API
    } catch (error) {
      setError("Error de conexión con el servidor."); // Mensaje de error
      console.error("Error de conexión:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>; // Mensaje de carga
  }

  return (
    <div>
      <h1>Lista de Hijos</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar mensaje de error */}
      {children.length === 0 ? (
        <p>No hay hijos disponibles.</p>
      ) : (
        <div>
          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              onEdit={() => handleEditChild(child.id)} // Función de manejo de edición (pendiente de implementación)
              onDelete={() => handleDeleteChild(child.id)} // Función de manejo de eliminación (pendiente de implementación)
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChildrenPage;
