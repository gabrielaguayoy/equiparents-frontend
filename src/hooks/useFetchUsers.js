// src/app/hooks/useFetchUsers.js

import { useEffect, useState } from "react";

const useFetchUsers = (token) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(""); // Reiniciar estado de error

      if (!token) {
        setError("No se puede acceder a los usuarios sin un token."); // Mensaje si no hay token
        setLoading(false);
        return; // Salir si no hay token
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Añadir token si hay
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al obtener los usuarios");
        }

        const data = await response.json();
        setUsers(data.data || []); // Ajustar según la estructura de la respuesta
      } catch (error) {
        setError(error.message || "Error de conexión con el servidor."); // Mensaje de error
      } finally {
        setLoading(false); // Terminar el estado de carga
      }
    };

    fetchUsers(); // Llama a la función para obtener los usuarios
  }, [token]);

  return { users, loading, error }; // Retorna los datos y estado
};

export default useFetchUsers;
