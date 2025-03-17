// src/app/dashboard/page.js
"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import ParentDashboard from "./ParentDashboard";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login"); // Redirigir si no hay usuario autenticado
      } else {
        if (user.roleName !== "admin" && user.roleName !== "parent") {
          router.push("/login"); // Redirigir si el rol no es válido
        }
      }
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>Cargando...</p>; // Mensaje de carga
  }

  // Verificar que el nombre de rol esté definido, antes de retornar
  if (!user || !user.roleName) {
    return null; // Evitar errores de renderización si el usuario no está definido
  }

  return user.roleName === "admin" ? <AdminDashboard /> : <ParentDashboard />;
};

export default DashboardPage;
