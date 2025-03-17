// src/app/users/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext"; // Ajustar la ruta según tu estructura

const UserDetailPage = ({ params }) => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const userId = params.id;

  useEffect(() => {
    if (loading) return; // Esperar hasta que se cargue el usuario

    // Redirigir si no hay usuario autenticado
    if (!user) {
      router.push("/login");
    } else {
      fetchUserData(); // Obtener datos del usuario
    }
  }, [loading, user, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los detalles del usuario");
      }

      const data = await response.json();
      setUserData(data.data || data); // Asumir que 'data' contiene la estructura esperada
    } catch (error) {
      setError(error.message || "Error de conexión con el servidor");
      console.error("Error al obtener el usuario:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>; // Mensaje de carga
  }

  return (
    <div>
      <h1>Detalles del Usuario</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar mensaje de error */}
      {userData ? (
        <div>
          <h2>
            {userData.firstName} {userData.lastName}
          </h2>
          <p>Email: {userData.email}</p>
          <p>Teléfono: {userData.phone || "No disponible"}</p>
          {/* Se agrega un control adicional en caso de que el teléfono no esté disponible */}
        </div>
      ) : (
        <p>No se encontraron datos para el usuario especificado.</p>
      )}
    </div>
  );
};

export default UserDetailPage;
