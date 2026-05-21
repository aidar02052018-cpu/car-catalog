"use client";

import Link from "next/link";
import { useState } from "react";
import { Car, Menu, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Variant = "transparent" | "solid";

const NAV_LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "/#advantages", label: "Преимущества" },
  { href: "/catalog/bmw-x5", label: "Конфигуратор" },
  { href: "/#contact", label: "Контакты" },
];

export function SiteHeader({ variant = "solid" }: { variant?: Variant }) {
  const [open, setOpen] = useState(false);
  const isTransparent = variant === "transparent";

  return (
    <>
      <header
        className={cn(
          "z-50",
          isTransparent
            ? "absolute inset-x-0 top-0"
            : "sticky top-0 border-b border-zinc-200 bg-white/90 backdrop-blur",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-10">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2",
              isTransparent ? "text-white" : "text-zinc-900",
            )}
          >
            <Car className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-base font-medium tracking-[0.2em] lg:text-lg">
              АВТОДОМ
            </span>
          </Link>

          <nav
            className={cn(
              "hidden gap-10 text-sm font-medium md:flex",
              isTransparent ? "text-white/80" : "text-zinc-600",
            )}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition",
                  isTransparent ? "hover:text-white" : "hover:text-zinc-900",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "hidden h-9 rounded-full px-4 md:inline-flex",
                isTransparent &&
                  "border-white/30 bg-transparent text-white hover:bg-white hover:text-zinc-900",
              )}
            >
              Записаться
            </Link>

            <button
              type="button"
              aria-label="Открыть меню"
              onClick={() => setOpen(true)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border md:hidden",
                isTransparent
                  ? "border-white/30 text-white"
                  : "border-zinc-200 text-zinc-900",
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-white p-6 md:hidden">
          <div className="flex h-10 items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-900">
              <Car className="h-5 w-5" strokeWidth={1.5} />
              <span className="text-base font-medium tracking-[0.2em]">АВТОДОМ</span>
            </div>
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="mt-12 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-heading text-3xl text-zinc-900 transition hover:text-zinc-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 w-full rounded-full",
              )}
            >
              Записаться
            </Link>
            <p className="mt-4 text-center text-xs text-zinc-500">
              +7 (495) 123-45-67 · hello@avtodom.ru
            </p>
          </div>
        </div>
      )}
    </>
  );
}
