/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Activa el modo estricto de React
  images: {
    domains: ["example.com"], // Dominios permitidos para fuentes de imágenes externas
  },
  env: {
    // Variables de entorno accesibles en el código del cliente
    JWT_SECRET: process.env.JWT_SECRET,
  },
  compiler: {
    // Si estás utilizando algún plugin o soporte de CSS-in-JS, puedes habilitarlo aquí
    styledComponents: true, // Ejemplo: habilitar Styled Components
  },
  async redirects() {
    return [
      {
        source: "/old-path", // Ruta vieja
        destination: "/new-path", // Nueva ruta
        permanent: true, // Redirección permanente
      },
    ];
  },
};

export default nextConfig;
