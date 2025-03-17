// src/context/AuthContext.js

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔄 Función para obtener los datos del usuario desde el backend
  const fetchUserData = useCallback(async (token) => {
    if (!token) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        logout();
        return;
      }

      const { data } = await response.json();
      setUser(data); // ✅ Guarda los datos del usuario
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔄 Cargar usuario automáticamente si hay token guardado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, [fetchUserData]);

  // ✅ Función para iniciar sesión
  const login = async (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData); // ✅ Guarda directamente los datos recibidos
    setLoading(false);
    router.push("/dashboard");
  };

  // ✅ Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 📌 Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);
