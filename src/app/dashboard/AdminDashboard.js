// src/app/dashboard/AdminDashboard.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && (!user || user.roleName !== "admin")) {
      console.error("❌ Acceso denegado. Redirigiendo...");
      window.location.href = "/auth/login";
    }
  }, [loading, user]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener usuarios");

        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        setError("Error al cargar los usuarios.");
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("No se pudo eliminar el usuario");

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
      alert("Error al eliminar usuario.");
    }
  };

  if (loading || isLoadingUsers) return <p>⏳ Cargando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div style={styles.container}>
      <h1>Panel de Administración</h1>
      <h2>Lista de Usuarios</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, firstName, lastName, email, roleName }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{`${firstName} ${lastName}`}</td>
              <td>{email.replace(/(.{3}).+(@.+)/, "$1****$2")}</td>
              <td>{roleName}</td>
              <td>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDeleteUser(id)}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  th: {
    background: "#0070f3",
    color: "white",
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  deleteButton: {
    backgroundColor: "#D57E5A",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminDashboard;
