// src/app/hooks/useFetchChildren.js

import { useEffect, useState, useCallback } from "react";

const useFetchChildren = (token) => {
  const [children, setChildren] = useState([]); // Estado para hijos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error

  const fetchChildren = useCallback(async () => {
    if (!token) {
      setError("No se puede acceder a los hijos sin un token.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/children`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener los hijos");
      }

      const data = await response.json();
      setChildren(data.data || []); // ✅ Actualizar lista de hijos
    } catch (err) {
      setError(err.message || "Error de conexión con el servidor.");
      console.error("Error de conexión con el servidor:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchChildren();
  }, [fetchChildren]);

  return { children, loading, error, refetch: fetchChildren }; // ✅ Devolvemos `refetch`
};

export default useFetchChildren;
