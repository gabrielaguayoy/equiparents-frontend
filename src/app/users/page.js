// src/app/users/page.js
"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import UserCard from "../../components/UserCard";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";

const UsersPage = () => {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user || user.roleName !== "admin") {
      router.push("/login");
    } else {
      fetchUsers();
    }
  }, [loading, user, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }

      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      setError(error.message || "Error de conexión con el servidor.");
      console.error("Error de conexión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) return <LoadingSpinner />; // 🚀 Muestra el Loader

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {users.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <div>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

// 🎨 Estilos mejorados
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "16px",
  },
  error: {
    color: "red",
    fontSize: "16px",
    textAlign: "center",
  },
  userList: {
    display: "grid",
    gap: "10px",
  },
};

export default UsersPage;
