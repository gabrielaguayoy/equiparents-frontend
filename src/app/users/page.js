// src/app/users/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "../../components/UserCard"; // Componente para mostrar información del usuario
import { useAuth } from "../../context/AuthContext"; // Hook de autenticación

const UsersPage = () => {
  const { user, loading } = useAuth(); // Obtener información de autenticación
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Esperar a que se cargue el estado

    // Redirigir si no hay un usuario autenticado o si no es admin
    if (!user || user.roleId !== "admin") {
      router.push("/login");
    } else {
      fetchUsers(); // Llamar a la API para obtener la lista de usuarios
    }
  }, [loading, user, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener usuarios"); // Lanzar error si la respuesta no es válida
      }

      const data = await response.json();
      setUsers(data.data || []); // Asegúrate de manejar correctamente la respuesta
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
      <h1>Lista de Usuarios</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar mensaje de error */}
      {users.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <div>
          {users.map((user) => (
            <UserCard key={user.id} user={user} /> // Renderiza cada usuario utilizando el componente UserCard
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
