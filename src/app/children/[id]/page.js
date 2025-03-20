// src/app/children/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../../../context/AuthContext"; // Importar contexto de autenticación

const ChildDetailPage = ({ params }) => {
  const { user, loading } = useAuth(); // Obtener estado de autenticación
  const [childData, setChildData] = useState(null); // Almacenar información del hijo
  const [error, setError] = useState(""); // Para manejar errores
  const router = useRouter();
  const childId = params.id; // Obtener el ID del hijo de los parámetros

  useEffect(() => {
    if (loading) return; // Esperar hasta que se cargue el usuario

    // Redirigir si no hay usuario autenticado
    if (!user) {
      router.push("/auth/login");
    } else {
      fetchChildData(); // Obtener los detalles del hijo específico
    }
  }, [loading, user, router]);

  const fetchChildData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/children/${childId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los detalles del hijo"); // Lanzar error para manejarlo en catch
      }

      const data = await response.json();
      setChildData(data.data || data); // Ajusta según la estructura de tu respuesta
    } catch (error) {
      setError(error.message || "Error de conexión con el servidor."); // Manejar el error de manera efectiva
      console.error("Error de conexión:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>; // Mensaje de carga mientras se obtienen los datos
  }

  return (
    <div>
      <h1>Detalles del Hijo</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar mensaje de error */}
      {childData ? (
        <div>
          <h2>{childData.name}</h2>
          <p>
            Fecha de Nacimiento:{" "}
            {new Date(childData.dateOfBirth).toLocaleDateString()}
          </p>
          <p>ID de Cuenta Parental: {childData.parentalAccountId}</p>
          <p>ID de Usuario Asociado: {childData.userId}</p>
          {/* Aquí puedes incluir más detalles del hijo si son necesarios */}
        </div>
      ) : (
        <p>No se encontraron datos para el hijo especificado.</p>
      )}
    </div>
  );
};

export default ChildDetailPage;
