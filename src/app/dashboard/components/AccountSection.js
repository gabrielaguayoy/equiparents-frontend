// src/app/dashboard/components/AccountSection.js
"use client";

import { useState, useEffect } from "react";
import InviteParentForm from "./InviteParentForm";

const AccountSection = ({ user }) => {
  const [parentalAccountName, setParentalAccountName] = useState("");
  const [progenitors, setProgenitors] = useState([]);
  const [showInviteForm, setShowInviteForm] = useState(false);

  useEffect(() => {
    if (user.parentalAccountId) {
      fetchParentalAccountDetails();
    }
  }, [user.parentalAccountId]);

  const fetchParentalAccountDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/parental-accounts/${user.parentalAccountId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response.ok)
        throw new Error("No se pudo obtener la cuenta parental");

      const data = await response.json();
      setParentalAccountName(data.data.name);
      setProgenitors(data.data.users || []);
    } catch (error) {
      console.error("❌ Error al obtener la cuenta parental:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cuenta Parental</h2>
      {parentalAccountName ? (
        <p style={styles.accountName}>{parentalAccountName}</p>
      ) : (
        <p>No tienes una cuenta parental asociada.</p>
      )}

      {/* ✅ Sección de Progenitores */}
      <div>
        <h3>Progenitores</h3>
        {progenitors.length > 0 ? (
          <ul style={styles.list}>
            {progenitors.map((parent) => (
              <li key={parent.id} style={styles.listItem}>
                {`${parent.firstName} ${parent.lastName}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay otros progenitores registrados.</p>
        )}

        {/* ✅ Mostrar botón para invitar si solo hay un progenitor */}
        {progenitors.length === 1 && (
          <button
            onClick={() => setShowInviteForm(!showInviteForm)}
            style={styles.inviteButton}
          >
            {showInviteForm ? "Cancelar" : "Invitar a otro progenitor"}
          </button>
        )}
        {showInviteForm && (
          <InviteParentForm onCancel={() => setShowInviteForm(false)} />
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#f9f9f9",
    textAlign: "center",
  },
  accountName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#0070f3",
    marginBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    padding: "5px 0",
  },
  inviteButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#D57E5A",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AccountSection;
