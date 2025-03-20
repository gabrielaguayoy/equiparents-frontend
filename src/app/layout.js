// src/app/layout.js
"use client";

import { AuthProvider } from "../context/AuthContext";
import Header from "../components/Header";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="es">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Equi·Parents</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <Header />
          <main className="container">{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
