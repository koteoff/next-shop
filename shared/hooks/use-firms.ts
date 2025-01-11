import { Api } from "@/shared/services/api-client";
import { Firm } from "@prisma/client";
import React, { useEffect, useState } from "react";

export const useFirms = () => {
  const [firms, setFirms] = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFirms = async () => {
      try {
        const response = await fetch("/api/firms");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных.");
        }
        const data = await response.json();
        setFirms(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFirms();
  }, []);

  return {
    firms,
    loading,
    error,
  };
};
