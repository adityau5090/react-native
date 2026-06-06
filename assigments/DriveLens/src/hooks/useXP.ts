import {
  useEffect,
  useState,
} from "react";

import { getXP } from "@/storage/xpStorage";

export function useXP() {
  const [xp, setXP] = useState(0);

  async function load() {
    const value =await getXP();

    setXP(value);
  }

  useEffect(() => {
    load();
  }, []);

  return {
    xp,
    refresh: load,
  };
}