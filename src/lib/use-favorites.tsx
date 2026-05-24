"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "primeprice-favorites";

type FavoritesContextValue = {
  ids: string[];
  isFavorite: (carId: string) => boolean;
  toggle: (carId: string) => void;
  remove: (carId: string) => void;
  clear: () => void;
  count: number;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setIds(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore
    }
  }, [ids, hydrated]);

  const isFavorite = useCallback((carId: string) => ids.includes(carId), [ids]);

  const toggle = useCallback((carId: string) => {
    setIds((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId],
    );
  }, []);

  const remove = useCallback((carId: string) => {
    setIds((prev) => prev.filter((id) => id !== carId));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  return (
    <FavoritesContext.Provider
      value={{ ids, isFavorite, toggle, remove, clear, count: ids.length }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be inside <FavoritesProvider>");
  return ctx;
}
