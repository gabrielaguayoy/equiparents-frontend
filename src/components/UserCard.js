// src/app/components/UserCard.js

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <p>Email: {user.email}</p>
      <p>Teléfono: {user.phone}</p>
      {/* Más información del usuario puede ser añadida aquí */}
      <style jsx>{`
        .user-card {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 10px;
          margin: 10px 0;
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
};

export default UserCard;
