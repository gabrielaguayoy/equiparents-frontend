// src/app/dashboard/AdminDashboard.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const filteredUsers = users.filter(
    (user) => user.roleName !== "parent" || user.parentalAccountId
  );

  useEffect(() => {
    if (loading) return; // Esperar a que se cargue el usuario

    // Verifica si el usuario está autenticado y si es administrador
    if (!user || user.roleName !== "admin") {
      router.push("/login"); // Redirigir a login si no es admin
    } else {
      fetchUsers(); // Obtener la lista de usuarios
    }
  }, [loading, user, router]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token"); // Asegurarse de obtener el token

    if (!token) {
      router.push("/login"); // Redirigir a login si no hay token
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Añadir token
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }

      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  // Definición de la función censorName
  const censorName = (firstName = "", lastName = "") => {
    const firstInitial = firstName.length > 0 ? firstName.charAt(0) : "*";
    const lastInitial = lastName.length > 0 ? lastName.charAt(0) : "*";
    return `${firstInitial.padEnd(8, "*")} ${lastInitial.padEnd(8, "*")}`;
  };

  if (loading) {
    return <p>Cargando...</p>; // Mensaje de carga
  }

  return (
    <div>
      <h1>Dashboard de Administrador</h1>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>ID de la Cuenta Parental</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{censorName(user.firstName, user.lastName)}</td>
                <td>{user.parentalAccountId || "N/A"}</td>
                <td>{user.roleName || "Desconocido"}</td>
                <td>
                  <button onClick={() => handleEditUser(user.id)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay usuarios disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
