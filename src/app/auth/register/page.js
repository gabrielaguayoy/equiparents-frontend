// src/app/auth/register/page.js

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { redirect } from "next/navigation";
import AccountOptions from "../../../components/AccountOptions";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    roleName: "",
    invitationCode: "",
    isCreatingAccount: true,
  });

  const [rolesList, setRolesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/roles`
        );
        if (!response.ok) throw new Error("No se pudieron obtener los roles");
        const { data } = await response.json();
        setRolesList(data || []);
      } catch (error) {
        setErrorMsg("Error al obtener los roles.");
      }
    };
    fetchRoles();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAccountChange = useCallback((isCreating) => {
    setFormData((prev) => ({
      ...prev,
      isCreatingAccount: isCreating,
      invitationCode: isCreating ? "" : prev.invitationCode,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const payload = {
      ...formData,
      accountOption: formData.isCreatingAccount ? "create" : "use-code",
    };

    console.log("🔍 Enviando datos al backend:", payload); // 🔥 Verifica antes de enviar

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Error al registrar usuario");
      }

      redirect("/auth/login");
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const shouldShowAccountOptions = useMemo(
    () => formData.roleName === "parent",
    [formData.roleName]
  );

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}

        {["firstName", "lastName", "email", "password", "phone"].map(
          (field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          )
        )}

        <select
          name="roleName"
          value={formData.roleName}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="" disabled>
            Selecciona un rol
          </option>
          {rolesList.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>

        {shouldShowAccountOptions && (
          <AccountOptions
            role={formData.roleName}
            isCreatingAccount={formData.isCreatingAccount}
            setIsCreatingAccount={handleAccountChange}
            invitationCode={formData.invitationCode}
            setInvitationCode={(value) =>
              setFormData((prev) => ({ ...prev, invitationCode: value }))
            }
          />
        )}

        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
};

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

export default Register;
