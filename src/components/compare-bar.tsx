"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";

import { useCompare } from "@/lib/use-compare";
import { getCar } from "@/lib/cars";

export function CompareBar() {
  const { ids, remove, clear, count } = useCompare();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-zinc-950/95 text-white shadow-2xl backdrop-blur"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 lg:flex-row lg:items-center lg:gap-6 lg:px-10">
            <div className="flex flex-1 items-center gap-2 overflow-x-auto">
              <p className="hidden shrink-0 text-xs font-medium uppercase tracking-[0.15em] text-white/50 lg:block">
                Сравнение
              </p>
              <div className="flex gap-2">
                {ids.map((id) => {
                  const car = getCar(id);
                  if (!car) return null;
                  return (
                    <motion.div
                      key={id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs"
                    >
                      <span className="whitespace-nowrap">
                        {car.brand} {car.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(id)}
                        className="text-white/60 transition hover:text-white"
                        aria-label="Убрать"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clear}
                className="text-xs text-white/60 transition hover:text-white"
              >
                Сбросить
              </button>
              <Link
                href={`/compare?ids=${ids.join(",")}`}
                className="inline-flex h-10 items-center justify-center gap-1 rounded-full bg-white px-5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
              >
                Сравнить ({count})
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
