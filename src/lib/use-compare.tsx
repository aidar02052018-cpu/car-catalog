"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "avtodom-compare";
const MAX = 4;

type CompareContextValue = {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  count: number;
  isFull: boolean;
};

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setIds(parsed.slice(0, MAX));
      }
    } catch {
      // ignore — localStorage может быть недоступен
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

  const add = (id: string) => {
    setIds((prev) => (prev.includes(id) ? prev : [...prev, id].slice(0, MAX)));
  };

  const remove = (id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
  };

  const toggle = (id: string) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(0, MAX)
    );
  };

  const clear = () => setIds([]);
  const isSelected = (id: string) => ids.includes(id);

  return (
    <CompareContext.Provider
      value={{
        ids,
        add,
        remove,
        toggle,
        clear,
        isSelected,
        count: ids.length,
        isFull: ids.length >= MAX,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error("useCompare must be used inside <CompareProvider>");
  }
  return ctx;
}

export const COMPARE_MAX = MAX;
