"use client";

import { Check, GitCompare } from "lucide-react";

import { useCompare } from "@/lib/use-compare";
import { cn } from "@/lib/utils";

export function CompareButton({
  carId,
  className,
}: {
  carId: string;
  className?: string;
}) {
  const { isSelected, toggle, isFull } = useCompare();
  const selected = isSelected(carId);
  const disabled = !selected && isFull;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
        toggle(carId);
      }}
      aria-label={selected ? "Убрать из сравнения" : "Добавить к сравнению"}
      title={
        disabled
          ? "Можно сравнивать до 4 моделей"
          : selected
            ? "В сравнении"
            : "К сравнению"
      }
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition",
        selected
          ? "bg-zinc-900 text-white"
          : "bg-white/95 text-zinc-700 hover:bg-white hover:text-zinc-900",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {selected ? <Check className="h-4 w-4" /> : <GitCompare className="h-4 w-4" />}
    </button>
  );
}
