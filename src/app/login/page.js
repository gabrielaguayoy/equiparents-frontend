// src/app/login/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { user, loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        let errorMessage = "Error en el inicio de sesión";
        try {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } catch (error) {
          console.error("Error al parsear la respuesta del servidor:", error);
        }
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      const { token, userData } = await response.json();
      login(token, userData);
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (error) {
      setError("Error en la conexión con el servidor");
      console.error("Error de conexión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        id="login-email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Correo Electrónico"
      />
      <input
        type="password"
        id="login-password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Contraseña"
      />
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        disabled={isLoading}
      >
        {isLoading ? "Cargando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
};

export default LoginPage;
