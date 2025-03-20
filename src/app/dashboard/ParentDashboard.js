// src/app/dashboard/ParentDashboard.js
"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import AccountModal from "../../components/AccountModal";
import InviteParentForm from "./components/InviteParentForm";
import ChildForm from "./components/ChildForm";
import ChildEditForm from "./components/ChildEditForm";
import ChildList from "./components/ChildList";

const ParentDashboard = () => {
  const { user, loading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [parentalAccount, setParentalAccount] = useState(null);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [showChildForm, setShowChildForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [refreshChildren, setRefreshChildren] = useState(false);

  /**
   * 📌 Cargar la cuenta parental si el usuario tiene una
   */
  useEffect(() => {
    if (!loading && user?.parentalAccountId) {
      fetchParentalAccountDetails();
    } else if (!user?.parentalAccountId) {
      setModalOpen(true);
    }
  }, [loading, user]);

  /**
   * 📌 Obtener detalles de la cuenta parental
   */
  const fetchParentalAccountDetails = useCallback(async () => {
    if (!user?.parentalAccountId) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/parental-accounts/${user.parentalAccountId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok)
        throw new Error("No se pudo obtener la cuenta parental");

      const data = await response.json();
      setParentalAccount(data.data);
    } catch (error) {
      console.error("❌ Error al obtener la cuenta parental:", error);
    }
  }, [user]);

  /**
   * 📌 Crear una cuenta parental si no existe
   */
  const createParentalAccount = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/parental-accounts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ userId: user.id }),
        }
      );

      if (!response.ok) throw new Error("No se pudo crear la cuenta parental");

      setModalOpen(false);
      await fetchParentalAccountDetails();
    } catch (error) {
      console.error("❌ Error al crear la cuenta parental:", error);
    }
  };

  /**
   * 📌 Manejar la edición de un hijo
   */
  const handleEditChild = (child) => {
    console.log("✏️ Editando hijo:", child);
    setSelectedChild(child);
    setShowEditForm(true);
  };

  /**
   * 📌 Actualizar la lista de hijos después de agregar/editar
   */
  const handleChildUpdated = () => {
    console.log("🔄 Lista de hijos actualizada");
    setRefreshChildren((prev) => !prev);
    setShowChildForm(false);
    setShowEditForm(false);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Bienvenido al Dashboard de Padres</h1>
      {user.parentalAccountId ? (
        <h2>{parentalAccount?.name || "Cuenta sin nombre"}</h2>
      ) : (
        modalOpen && (
          <AccountModal
            onClose={() => setModalOpen(false)}
            onCreateAccount={createParentalAccount}
          />
        )
      )}

      {user.parentalAccountId && parentalAccount && (
        <>
          {/* 🔹 Sección de progenitores */}
          <div>
            <h2>Progenitores</h2>
            {parentalAccount.users.length > 0 ? (
              <ul>
                {parentalAccount.users.map((parent) => (
                  <li key={parent.id}>
                    {parent.firstName} {parent.lastName}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay otros progenitores registrados.</p>
            )}
            {parentalAccount.users.length === 1 && (
              <button onClick={() => setShowInviteForm((prev) => !prev)}>
                Invitar a otro progenitor
              </button>
            )}
            {showInviteForm && <InviteParentForm />}
          </div>

          {/* 🔹 Sección de hijos */}
          <div>
            <h2>Hijos</h2>
            <button onClick={() => setShowChildForm(true)}>Agregar hijo</button>
            {showChildForm && (
              <ChildForm
                onChildAdded={handleChildUpdated}
                onCancel={() => setShowChildForm(false)}
              />
            )}
            {showEditForm && selectedChild && (
              <ChildEditForm
                child={selectedChild}
                onChildUpdated={handleChildUpdated}
                onCancel={() => setShowEditForm(false)}
              />
            )}
            <ChildList key={refreshChildren} onEditChild={handleEditChild} />
          </div>
        </>
      )}
    </div>
  );
};

export default ParentDashboard;
