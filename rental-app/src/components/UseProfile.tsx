"use client";
import { useState, useEffect } from "react";

interface ProfileData {
  loading: boolean;
  data: {
    admin: boolean;
  };
}

export function useProfile(): ProfileData {
  const [data, setData] = useState({ admin: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile")
      .then((response) => {
        response.json().then((data) => {
          setData(data);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, []);

  return { loading, data };
}
