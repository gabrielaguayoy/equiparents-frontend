// src/app/components/Header.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css"; // ✅ Importación del CSS Module

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Equi·Parents</h1>
      <nav className={styles.nav}>
        {userData ? (
          <>
            <span className={styles.welcome}>
              {userData.firstName} {userData.lastName} ({userData.roleName})
            </span>
            <Link href="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
              aria-label="Cerrar sesión"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className={styles.navLink}>
              Iniciar sesión
            </Link>
            <Link href="/auth/register" className={styles.navLink}>
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
