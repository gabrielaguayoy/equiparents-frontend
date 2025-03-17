// src/app/register/page.js
"use client";

import { useState, useEffect } from "react";
import Input from "../../components/Input";
import SelectRole from "../../components/SelectRole";
import AccountOptions from "../../components/AccountOptions";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [rolesList, setRolesList] = useState([]);
  const [isCreatingAccount, setIsCreatingAccount] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/roles`
        );
        if (!response.ok)
          throw new Error(`Error ${response.status}: No se pudo obtener roles`);
        const data = await response.json();
        setRolesList(data.data || []);
      } catch (error) {
        setRolesList([]); // Evita valores undefined
        setErrorMsg(error.message || "Error de conexión al cargar roles.");
        console.error("Error al obtener roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    if (!role || role.trim() === "") {
      setErrorMsg("Por favor, selecciona un rol.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            phone,
            role,
            invitationCode: isCreatingAccount ? null : invitationCode || "",
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = "Error al registrar usuario";
        try {
          const data = await response.json();
          errorMessage = data.message || errorMessage;
        } catch (error) {
          console.error("Error al parsear la respuesta del servidor:", error);
        }
        setErrorMsg(errorMessage);
        setIsLoading(false);
        return;
      }

      const { token, userData } = await response.json();
      console.log("Usuario registrado:", userData);

      // Limpiar los campos después del registro
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setInvitationCode("");
    } catch (error) {
      setErrorMsg("Error en la conexión con el servidor");
      console.error("Error de conexión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Registro de Usuario</h2>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <Input
        id="first-name"
        label="Nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        autoComplete="given-name"
      />
      <Input
        id="last-name"
        label="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        autoComplete="family-name"
      />
      <Input
        id="email"
        label="Correo Electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        id="password"
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <Input
        id="phone"
        label="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        autoComplete="tel"
      />
      <SelectRole
        rolesList={rolesList}
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
          setIsCreatingAccount(e.target.value === "parent");
        }}
      />
      {role === "parent" && (
        <AccountOptions
          isCreatingAccount={isCreatingAccount}
          setIsCreatingAccount={setIsCreatingAccount}
          invitationCode={invitationCode}
          setInvitationCode={setInvitationCode}
        />
      )}
      <button type="submit" disabled={isLoading} style={styles.button}>
        {isLoading ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
};

// Estilos
const styles = {
  form: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    background: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2E87E5",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Register;
