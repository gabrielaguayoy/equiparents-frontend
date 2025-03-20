// src/hooks/useFetchUsers.js
export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible.");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener usuarios");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    throw error;
  }
};
