import { useEffect, useState } from "react";

import { getSessions } from "@/storage/sessionStorage";

import { DriveSession } from "@/types/drive";

export function useDriveHistory() {
  const [sessions, setSessions] = useState<DriveSession[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadSessions =
    async () => {
      try {
        const data = await getSessions();
        // console.log("Session data :", data);
        setSessions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadSessions();
  }, []);

  return {
    sessions,
    loading,
    refresh: loadSessions,
  };
}