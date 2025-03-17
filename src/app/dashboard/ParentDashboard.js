// src/app/dashboard/ParentDashboard.js

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import ChildList from "./ChildList";
import AccountModal from "../../components/AccountModal";

const ParentDashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [parentalAccountName, setParentalAccountName] = useState("");
  const [newChild, setNewChild] = useState({ name: "", dateOfBirth: "" });
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
    } else if (user.parentalAccountId) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user?.parentalAccountId) {
      fetchParentalAccountName();
    }
  }, [user?.parentalAccountId]);

  const fetchParentalAccountName = async () => {
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
    } catch (error) {
      console.error("❌ Error al obtener la cuenta parental:", error);
    }
  };

  const handleAddChild = async (e) => {
    e.preventDefault();
    setIsAddingChild(true);
    setErrorMsg("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/children`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newChild.name,
            dateOfBirth: newChild.dateOfBirth,
            parentalAccountId: user.parentalAccountId,
            userId: user.id,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "No se pudo agregar el hijo.");
      }

      setNewChild({ name: "", dateOfBirth: "" }); // Limpiar formulario
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsAddingChild(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Bienvenido al Dashboard de Padres</h1>
      {user.parentalAccountId ? (
        <h2 style={styles.accountDisplay}>{parentalAccountName}</h2>
      ) : (
        modalOpen && (
          <AccountModal
            onClose={() => setModalOpen(false)}
            onCreateAccount={() => console.log("Crear cuenta")}
          />
        )
      )}

      <ChildList />
    </div>
  );
};

const styles = {
  accountDisplay: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "normal",
    textTransform: "none",
    float: "right",
    marginTop: "-30px",
  },
  childFormContainer: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#f9f9f9",
  },
  childForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ParentDashboard;
