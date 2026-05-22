"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { AuthModal } from "@/components/auth-modal";
import { useAuth } from "@/lib/use-auth";
import { useFavorites } from "@/lib/use-favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  carId,
  className,
}: {
  carId: string;
  className?: string;
}) {
  const { user } = useAuth();
  const { isFavorite, toggle } = useFavorites();
  const [authOpen, setAuthOpen] = useState(false);
  const favorited = user ? isFavorite(carId) : false;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!user) {
            setAuthOpen(true);
            return;
          }
          toggle(carId);
        }}
        aria-label={
          favorited ? "Убрать из избранного" : "Добавить в избранное"
        }
        title={favorited ? "В избранном" : "В избранное"}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition",
          favorited
            ? "bg-rose-500 text-white"
            : "bg-white/95 text-zinc-700 hover:bg-white hover:text-rose-500",
          className,
        )}
      >
        <Heart
          className={cn("h-4 w-4", favorited && "fill-current")}
          strokeWidth={1.75}
        />
      </button>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
