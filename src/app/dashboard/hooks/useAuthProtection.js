// src/app/dashboard/hooks/useAuthProtection.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { redirect } from "next/navigation";

const useAuthProtection = (allowedRoles) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/auth/login");
      } else if (allowedRoles.includes(user.roleName)) {
        setAuthorized(true);
      } else {
        router.replace("/auth/login");
      }
    }
  }, [loading, user, router]);

  return { authorized, loading };
};

export default useAuthProtection;
