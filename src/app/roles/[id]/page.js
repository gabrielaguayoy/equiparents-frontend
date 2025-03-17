// src/app/roles/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // Ajustar la ruta según tu estructura

const RoleDetailPage = ({ params }) => {
  const { user, loading } = useAuth(); // Obtener estado de autenticación
  const [roleData, setRoleData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const roleId = params.id; // Obtener el ID del rol de los parámetros

  useEffect(() => {
    if (loading) return;

    // Redirigir si no hay usuario autenticado o no es admin
    if (!user || user.roleId !== "admin") {
      router.push("/login");
    } else {
      fetchRoleData(); // Obtener la información del rol específico
    }
  }, [loading, user, router]);

  const fetchRoleData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/roles/${roleId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los detalles del rol"); // Lanzar error para un manejo simplificado
      }

      const data = await response.json();
      setRoleData(data.data || data); // Ajustar según la estructura de la respuesta
    } catch (error) {
      setError(error.message || "Error de conexión con el servidor"); // Mostrar mensaje de error específico
      console.error("Error de conexión:", error);
    }
  };

  if (loading) return <p>Cargando...</p>; // Mensaje de carga

  return (
    <div>
      <h1>Detalles del Rol</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar mensaje de error */}
      {roleData ? (
        <div>
          <h2>{roleData.name}</h2>
          <p>Descripción: {roleData.description}</p>
          {/* También podrías mostrar otras propiedades del rol si son necesarias */}
        </div>
      ) : (
        <p>No se encontraron datos para el rol especificado.</p>
      )}
    </div>
  );
};

export default RoleDetailPage;
