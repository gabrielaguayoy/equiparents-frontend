// src/app/layout.js

import Header from "../components/Header"; // Asegúrate de importar correctamente
import { AuthProvider } from "../context/AuthContext"; // Importa el AuthProvider

export default function Layout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>Equi·Parents</title>
      </head>
      <body>
        <AuthProvider>
          <Header />
          <div className="container">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
