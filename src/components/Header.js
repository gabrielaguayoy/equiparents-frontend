// src/app/components/Header.js
"use client";

import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      <h1>Equi·Parents</h1>
      {user ? (
        <>
          <span style={styles.welcome}>
            Bienvenido, {user.firstName} ({user.roleName})
          </span>
          <button onClick={logout} style={styles.button}>
            Cerrar sesión
          </button>
          <Link href="/dashboard" style={styles.button}>
            Dashboard
          </Link>
        </>
      ) : (
        <>
          <Link href="/login" style={styles.button}>
            Iniciar sesión
          </Link>
          <Link href="/register" style={styles.button}>
            Registrarse
          </Link>
        </>
      )}
    </header>
  );
};

// Estilos del header
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "white",
  },
  button: {
    color: "white",
    marginLeft: "10px",
    textDecoration: "none",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  welcome: {
    marginRight: "10px",
  },
};

export default Header;
