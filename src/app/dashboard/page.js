// src/app/dashboard
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import ParentDashboard from "./ParentDashboard";

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const [dashboardComponent, setDashboardComponent] = useState(null);

  useEffect(() => {
    if (loading) return;

    console.log("🔍 Usuario actual en Dashboard:", user);

    if (!user || !user.roleName) {
      console.warn(
        "❌ Usuario no autenticado o sin permisos. Redirigiendo a login..."
      );
      window.location.href = "/auth/login";
      return;
    }

    if (user.roleName === "admin") {
      setDashboardComponent(<AdminDashboard />);
    } else if (user.roleName === "parent") {
      setDashboardComponent(<ParentDashboard />);
    } else {
      console.error("❌ Rol desconocido:", user.roleName);
      setDashboardComponent(<p>❌ Error: Rol no identificado.</p>);
    }
  }, [loading, user]);

  if (loading) return <p>⏳ Cargando...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {dashboardComponent}
    </div>
  );
};

export default DashboardPage;
