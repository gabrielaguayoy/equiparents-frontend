// src/context/AuthContext.js
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  /**
   * 📌 Obtiene los datos del usuario desde el backend.
   */
  const fetchUserData = useCallback(async () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) {
      console.warn("⚠️ No hay token. Se limpiará la sesión.");
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      console.log("🔍 Verificando autenticación...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Sesión expirada o token inválido.");

      const { data } = await response.json();
      console.log("✅ Usuario autenticado:", data);
      setUser(data);
    } catch (error) {
      console.error("❌ Error en autenticación:", error.message);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  /**
   * 📌 Controla la redirección segura y evita loops infinitos.
   */
  useEffect(() => {
    if (loading) return;

    if (!user) {
      if (!["/auth/login", "/auth/register"].includes(pathname)) {
        console.warn("🔄 Usuario no autenticado. Redirigiendo a login...");
        router.replace("/auth/login");
      }
    } else {
      if (["/auth/login", "/auth/register"].includes(pathname)) {
        console.log("🔄 Usuario autenticado. Redirigiendo al dashboard...");
        router.replace("/dashboard");
      }
    }
  }, [user, loading, pathname, router]);

  /**
   * 📌 Maneja el inicio de sesión y almacena credenciales de manera segura.
   */
  const login = (token, userData) => {
    console.log("🔑 Iniciando sesión...");

    sessionStorage.setItem("token", token);
    localStorage.setItem("token", token); // Mantiene sesión después de cerrar navegador
    setUser(userData);

    console.log("✅ Sesión iniciada. Redirigiendo...");
    router.replace("/dashboard");
  };

  /**
   * 📌 Maneja el cierre de sesión y limpia completamente los datos.
   */
  const logout = () => {
    console.log("🚪 Cerrando sesión...");

    sessionStorage.removeItem("token");
    localStorage.removeItem("token");

    setUser(null);

    console.log("🔄 Redirigiendo a login...");
    window.location.href = "/auth/login"; // 🔥 Forza la recarga para limpiar el estado global
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 📌 Hook personalizado para acceder al contexto de autenticación.
 */
export const useAuth = () => useContext(AuthContext);
