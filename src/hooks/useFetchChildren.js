// src/hooks/useFetchChildren.js

import { useEffect, useState, useCallback } from "react";

const useFetchChildren = (token) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchChildren = useCallback(async () => {
    if (!token) {
      setError("⚠ No se puede acceder a los hijos sin un token.");
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
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setChildren(data.data || []);
    } catch (err) {
      setError(err.message || "❌ Error de conexión con el servidor.");
      console.error("Error al obtener hijos:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchChildren();
  }, [fetchChildren]);

  return { children, loading, error, refetch: fetchChildren };
};

export default useFetchChildren;
