// src/app/users/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import LoadingSpinner from "../../../components/LoadingSpinner"; // Usamos un loader amigable

const UserDetailPage = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = useParams(); // ✅ Obtiene el ID del usuario desde la URL

  useEffect(() => {
    if (loading) return; // Esperamos a que se cargue la autenticación

    if (!user) {
      router.push("/auth/login");
      return;
    }

    fetchUserData();
  }, [loading, user, router]); // ✅ Eliminamos dependencias innecesarias

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No hay token de autenticación.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, // ✅ Usamos el `id` de `useParams`
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los detalles del usuario.");
      }

      const data = await response.json();
      setUserData(data.data || {}); // ✅ Manejo más seguro de `data`
    } catch (error) {
      setError(error.message || "Error de conexión con el servidor.");
      console.error("❌ Error al obtener el usuario:", error);
    }
  };

  if (loading || !userData) {
    return <LoadingSpinner />; // ✅ Loader visual amigable
  }

  return (
    <div style={styles.container}>
      <h1>Detalles del Usuario</h1>
      {error ? (
        <p style={styles.error}>❌ {error}</p>
      ) : (
        <div style={styles.card}>
          <h2>
            {userData.firstName} {userData.lastName}
          </h2>
          <p>Email: {userData.email}</p>
          <p>Teléfono: {userData.phone || "No disponible"}</p>
        </div>
      )}
    </div>
  );
};

// 🎨 Estilos mejorados
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "20px auto",
  },
  error: {
    color: "red",
    fontSize: "16px",
  },
};

export default UserDetailPage;
