EquiParents - Frontend

Este es el frontend de EquiParents, desarrollado con Next.js y React.

🚀 Requisitos Previos

Asegúrate de tener instalado:

🟢 Node.js (versión 18 o superior)

🟢 Git

🟢 Visual Studio Code

📥 Instalación

1️⃣ Clonar el repositorio

git clone git@github.com:gabrielaguayoy/equiparents-frontend.git
cd equiparents-frontend

2️⃣ Instalar dependencias

npm install

3️⃣ Configurar variables de entorno

Crea un archivo .env.local en la raíz del proyecto y copia lo siguiente:

NEXT_PUBLIC_API_URL="http://localhost:5000/api"

4️⃣ Iniciar el frontend

npm run dev

5️⃣ Abrir en el navegador

http://localhost:3000

🖥 Uso en Visual Studio Code

Abre VS Code y selecciona File > Open Folder y elige equiparents-frontend

Abre una terminal integrada con:

Ctrl + ñ (Windows/Linux)

Cmd + ñ (Mac)

Ejecuta npm run dev para iniciar la aplicación en localhost

Abre el navegador en http://localhost:3000

📂 Estructura del Proyecto

equiparents-frontend/
│── src/
│ ├── app/ # Páginas de la aplicación
│ ├── components/ # Componentes reutilizables
│ ├── context/ # Contexto de autenticación
│ ├── hooks/ # Hooks personalizados
│ ├── styles/ # Estilos globales y módulos CSS
│── .env.local # Variables de entorno
│── package.json
│── README.md

🎨 Colores del Proyecto

El diseño del frontend utiliza los siguientes colores:

🔵 Azul Principal: #0070f3

🟢 Verde Pastel: #B7C9A4

🟠 Naranja Suave: #D57E5A

⚫ Gris Oscuro: #333333

🔷 Azul Oscuro: #004AAD

🏵️ Crema: #F0EAD6

🚀 Despliegue

Para desplegar el frontend en Vercel:

vercel login
vercel

Con esto puedes correr EquiParents en local y desplegarlo fácilmente. 🎉
