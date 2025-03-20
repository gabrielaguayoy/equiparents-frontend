// src/app/page.js
"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      redirect("/dashboard"); // ✅ Redirección inmediata si el usuario está autenticado
    } else {
      redirect("/auth/login"); // ✅ Redirección si no está autenticado
    }
  }, [user]);

  return (
    <div style={styles.container}>
      <img
        src="/images/logo.png"
        alt="Logo de Equi·Parents"
        style={styles.logo}
      />
      <h1>
        Bienvenido a <span style={styles.brand}>Equi·Parents</span>
      </h1>
      <p>by Equi Innova</p>
      <p style={styles.subtext}>Cargando, por favor espera...</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#F0EAD6", // Color del diseño
    textAlign: "center",
  },
  logo: {
    maxWidth: "250px",
    marginBottom: "20px",
  },
  brand: {
    color: "#0070f3",
  },
  subtext: {
    marginTop: "10px",
    color: "#333",
    fontSize: "14px",
  },
};

export default HomePage;
