// src/app/page.js

"use client"; // Usar el cliente Next.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que la ruta es correcta

const HomePage = () => {
  const { user } = useAuth(); // Obtener el estado de autenticación del contexto
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      user ? router.push("/dashboard") : router.push("/login"); // Redirigir según la autenticación
    }, 3000); // Tiempo de espera en milisegundos (3 segundos)

    return () => clearTimeout(timeout); // Limpiar el timeout al desmontar
  }, [user, router]);

  return (
    <div style={styles.container}>
      <img src="/images/logo.png" alt="Equi·Parents Logo" style={styles.logo} />
      <h1>Bienvenido a Equi·Parents</h1>
      <p>by Equi Innova</p>
      <p style={styles.subtext}>Cargando, por favor espera...</p>{" "}
      {/* Mensaje de carga */}
    </div>
  );
};

// Estilos en línea para el contenedor
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  logo: {
    maxWidth: "300px", // Tamaño máximo del logo
    marginBottom: "20px",
  },
  subtext: {
    marginTop: "10px",
    color: "#555", // Color gris para el texto secundario
  },
};

export default HomePage;
