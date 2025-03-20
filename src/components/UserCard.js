// src/components/UserCard.js

const UserCard = ({ user }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.name}>
        {user.firstName} {user.lastName}
      </h3>
      <p style={styles.email}>📧 {user.email}</p>
      <p style={styles.phone}>📞 {user.phone || "No disponible"}</p>
      <p style={styles.role}>
        🎭 Rol: <strong>{user.role?.name || "Desconocido"}</strong>
      </p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: "14px",
    color: "#555",
  },
  phone: {
    fontSize: "14px",
    color: "#777",
  },
  role: {
    fontSize: "14px",
    color: "#0070f3", // ✅ Azul para destacar
  },
};

export default UserCard;
