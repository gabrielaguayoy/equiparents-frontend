// src/app/hooks/useAuth.js

import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Asegúrate de que la ruta sea correcta

// Custom hook para usar el contexto de autenticación
const useAuth = () => {
  const context = useContext(AuthContext);

  // Si el contexto no está disponible, lanza un error
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context; // Devuelve el contexto, que contiene user, loading, login y logout
};

const login = async (token, userData) => {
  localStorage.setItem("token", token);
  setUser(userData);
  console.log("🔑 Token del usuario:", token); // ✅ Ver el token en consola
};

export default useAuth;
