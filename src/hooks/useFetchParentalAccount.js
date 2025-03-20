// src/app/hooks/useFetchParentalAccount.js
import { useState, useEffect } from "react";

const useFetchParentalAccount = (parentalAccountId, token) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!parentalAccountId || !token) return;

    const fetchAccount = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/parental-accounts/${parentalAccountId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok)
          throw new Error("No se pudo obtener la cuenta parental");

        const data = await response.json();
        setAccount(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [parentalAccountId, token]);

  return { account, loading, error };
};

export default useFetchParentalAccount;
