// src/middleware.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const token = request.cookies.get("token"); // Obtener el token de las cookies

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET); // Verificar el token JWT
      return NextResponse.next(); // Permitir la solicitud si el token es válido
    } catch (error) {
      console.error("JWT no válido:", error.message);
      return NextResponse.redirect(new URL("/auth/login", request.url)); // Redirigir a login si el JWT no es válido
    }
  }

  console.warn("No se proporcionó token, redirigiendo a login.");
  return NextResponse.redirect(new URL("/auth/login", request.url)); // Redirigir a login si no hay token
}

// Definir rutas protegidas
export const config = {
  matcher: ["/protected/:path*"], // Rutas que deseas proteger con este middleware
};
