"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/use-auth";

type FavoritesContextValue = {
  ids: string[];
  loading: boolean;
  isFavorite: (carId: string) => boolean;
  toggle: (carId: string) => Promise<void>;
  remove: (carId: string) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [ids, setIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load favorites when user changes
  useEffect(() => {
    if (!user) {
      setIds([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    supabase
      .from("favorites")
      .select("car_id")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.warn("favorites load error:", error.message);
          setIds([]);
        } else {
          setIds(data?.map((r) => r.car_id as string) ?? []);
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const isFavorite = useCallback((carId: string) => ids.includes(carId), [ids]);

  const toggle = useCallback(
    async (carId: string) => {
      if (!user) return;
      const already = ids.includes(carId);
      // Оптимистичное обновление UI
      setIds((prev) =>
        already ? prev.filter((id) => id !== carId) : [...prev, carId],
      );
      if (already) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("car_id", carId);
        if (error) {
          // Откатить если ошибка
          setIds((prev) => [...prev, carId]);
        }
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, car_id: carId });
        if (error) {
          setIds((prev) => prev.filter((id) => id !== carId));
        }
      }
    },
    [ids, user],
  );

  const remove = useCallback(
    async (carId: string) => {
      if (!user || !ids.includes(carId)) return;
      setIds((prev) => prev.filter((id) => id !== carId));
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("car_id", carId);
    },
    [ids, user],
  );

  return (
    <FavoritesContext.Provider value={{ ids, loading, isFavorite, toggle, remove }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be inside <FavoritesProvider>");
  return ctx;
}
