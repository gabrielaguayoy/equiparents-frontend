// src/app/components/ChildCard.js

const ChildCard = ({ child, onEdit, onDelete }) => {
  return (
    <div className="child-card">
      <h3>{child.name}</h3>
      <p>
        Fecha de Nacimiento: {new Date(child.dateOfBirth).toLocaleDateString()}
      </p>
      <div className="actions">
        <button onClick={onEdit}>Editar</button>
        <button onClick={onDelete}>Eliminar</button>
      </div>
      <style jsx>{`
        .child-card {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 10px;
          margin: 10px 0;
          background-color: #f9f9f9;
        }
        .actions {
          margin-top: 10px;
        }
        button {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default ChildCard;
