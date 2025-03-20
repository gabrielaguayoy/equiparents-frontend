// src/components/LoadingSpinner.js

"use client"; // ⚡ Asegura que solo se renderiza en el cliente

const LoadingSpinner = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Cargando... Dándole equilibrio a todo ⚖️</p>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(240, 234, 214, 0.8)", // Color suave y amigable
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "6px solid #0070f3", // Azul principal
    borderTop: "6px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#333",
    fontWeight: "bold",
  },
};

export default LoadingSpinner;
