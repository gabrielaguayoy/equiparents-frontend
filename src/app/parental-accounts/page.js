// src/app/parental-accounts/page.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Importar el contexto de autenticación
import { useRouter } from "next/navigation"; // Para la navegación
import ParentalAccountCard from "../../components/ParentalAccountCard"; // Componente para mostrar información de cuenta parental

const ParentalAccountsPage = () => {
  const { user, loading } = useAuth(); // Obtener el estado de autenticación
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Esperar a que se cargue el usuario

    // Redirigir si no hay un usuario autenticado o no es un administrador
    if (!user || user.roleId !== "admin") {
      router.push("/login");
    } else {
      fetchAccounts(); // Obtener la lista de cuentas parentales
    }
  }, [loading, user, router]);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/parentalAccounts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener cuentas parentales"); // Lanzar error si no es una respuesta exitosa
      }

      const data = await response.json();
      setAccounts(data.data || []); // Ajustar según la estructura de la respuesta
    } catch (error) {
      setError(error.message || "Error de conexión con el servidor."); // Usar mensaje de error específico
      console.error("Error de conexión:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>; // Mensaje de carga
  }

  return (
    <div>
      <h1>Lista de Cuentas Parentales</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mensaje de error */}
      {accounts.length === 0 ? (
        <p>No hay cuentas parentales disponibles.</p>
      ) : (
        <div>
          {accounts.map((account) => (
            <ParentalAccountCard key={account.id} account={account} /> // Renderiza cada cuenta parental
          ))}
        </div>
      )}
    </div>
  );
};

export default ParentalAccountsPage;
