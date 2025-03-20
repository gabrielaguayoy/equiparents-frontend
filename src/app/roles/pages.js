// src/app/roles/page.js
"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // Importar el contexto de autenticación
import RoleCard from "../../components/RoleCard"; // Componente para mostrar información de un rol

const RolesPage = () => {
  const { user, loading } = useAuth(); // Obtener estado de autenticación
  const [roles, setRoles] = useState([]); // Almacenar roles
  const [error, setError] = useState(""); // Mensaje de error
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Esperar a que se cargue el usuario

    // Redirigir si no hay usuario autenticado o no es admin
    if (!user || user.roleId !== "admin") {
      router.push("/auth/login");
    } else {
      fetchRoles(); // Obtener la lista de roles
    }
  }, [loading, user, router]);

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener roles"); // Lanzar error
      }

      const data = await response.json();
      setRoles(data.data || []); // Asegúrate que está de acuerdo con tu respuesta API
    } catch (error) {
      setError(error.message || "Error de conexión con el servidor."); // Mensaje de error
      console.error("Error de conexión:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>; // Mensaje de carga
  }

  return (
    <div>
      <h1>Lista de Roles</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar mensaje de error */}
      {roles.length === 0 ? (
        <p>No hay roles disponibles.</p>
      ) : (
        <div>
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} /> // Renderiza cada rol con el componente RoleCard
          ))}
        </div>
      )}
    </div>
  );
};

export default RolesPage;
