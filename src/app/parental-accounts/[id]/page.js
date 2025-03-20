// src/app/parental-accounts/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../../../context/AuthContext"; // Ajustar la ruta según tu estructura

const ParentalAccountDetailPage = ({ params }) => {
  const { user, loading } = useAuth(); // Obtener estado de autenticación
  const [accountData, setAccountData] = useState(null); // Almacenar información de la cuenta parental
  const [error, setError] = useState("");
  const router = useRouter();
  const accountId = params.id; // Obtener el ID de la cuenta parental de los parámetros

  useEffect(() => {
    if (loading) return; // Esperar si está cargando

    // Redirigir si no hay usuario autenticado
    if (!user) {
      router.push("/auth/login");
    } else {
      fetchAccountData(); // Obtener la información de la cuenta parental
    }
  }, [loading, user, router]);

  const fetchAccountData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/parentalAccounts/${accountId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los detalles de la cuenta parental"); // Lanzar error
      }

      const data = await response.json();
      setAccountData(data.data || data); // Ajusta según la estructura de la respuesta
    } catch (error) {
      setError(error.message || "Error de conexión con el servidor");
      console.error("Error de conexión:", error);
    }
  };

  if (loading) return <p>Cargando...</p>; // Mensaje de carga

  return (
    <div>
      <h1>Detalles de la Cuenta Parental</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar mensaje de error */}
      {accountData ? (
        <div>
          <h2>ID de la Cuenta: {accountData.id}</h2>
          <p>
            Fecha de Creación:{" "}
            {new Date(accountData.createdAt).toLocaleDateString()}
          </p>
          <p>
            Fecha de Última Actualización:{" "}
            {new Date(accountData.updatedAt).toLocaleDateString()}
          </p>
          <p>Usuarios Asociados: {accountData.users.length}</p>
          <p>Hijos Asociados: {accountData.children.length}</p>
        </div>
      ) : (
        <p>No se encontraron datos para la cuenta parental especificada.</p>
      )}
    </div>
  );
};

export default ParentalAccountDetailPage;
