// src/utils/api.js

// Define la URL base de la API
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Función para manejar las solicitudes GET
export const fetchData = async (endpoint, token) => {
  return requestData("GET", endpoint, null, token);
};

// Función para manejar las solicitudes POST
export const postData = async (endpoint, data, token) => {
  return requestData("POST", endpoint, data, token);
};

// Función para manejar las solicitudes PUT
export const updateData = async (endpoint, data, token) => {
  return requestData("PUT", endpoint, data, token);
};

// Función para manejar las solicitudes DELETE
export const deleteData = async (endpoint, token) => {
  return requestData("DELETE", endpoint, null, token);
};

// Función auxiliar para manejar las solicitudes de la API
const requestData = async (method, endpoint, data = null, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Añadir token si está disponible
    };

    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null, // Agregar el cuerpo solo si hay datos
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || "Error en la solicitud");
    }

    return response.status === 204 ? null : await response.json(); // Retornar datos de la respuesta, o null para 204 No Content
  } catch (error) {
    console.error(`${method} request error:`, error);
    throw error; // Propagar el error
  }
};
