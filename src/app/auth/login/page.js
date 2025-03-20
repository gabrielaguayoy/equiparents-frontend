"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation"; // ✅ Corrección: Se usa useRouter en cliente
import { useAuth } from "../../../context/AuthContext";

const LoginPage = () => {
  const { login, user } = useAuth();
  const router = useRouter(); // ✅ useRouter() en cliente
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // ✅ Redirigir a dashboard si ya está autenticado
    }
  }, [user, router]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      try {
        console.log("📡 Enviando solicitud de login...", formData); // Debug

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`, // ✅ Corrección en la URL
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error en login");

        login(data.token, data.user);
        router.push("/dashboard"); // ✅ Redirección tras login exitoso
      } catch (error) {
        console.error("❌ Error en login:", error);
        setError(error.message);
      }
    },
    [formData, login, router]
  );

  return (
    <div style={styles.container}>
      <h1>Iniciar Sesión</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {["email", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "email"}
            name={field}
            placeholder={
              field.charAt(0).toUpperCase() + field.slice(1) // ✅ Capitalizar placeholder
            }
            value={formData[field]}
            onChange={handleChange}
            required
            style={styles.input}
          />
        ))}
        <button type="submit" style={styles.button}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

// Estilos del login
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background:
      "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
  },
  form: {
    width: "400px",
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "var(--box-shadow)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid var(--border-color)",
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "var(--accent-color)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default LoginPage;
