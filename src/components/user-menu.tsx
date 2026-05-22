"use client";

import Link from "next/link";
import { useState } from "react";
import { LogOut, User as UserIcon } from "lucide-react";

import { AuthModal } from "@/components/auth-modal";
import { useAuth } from "@/lib/use-auth";
import { cn } from "@/lib/utils";

export function UserMenu({ variant = "solid" }: { variant?: "solid" | "transparent" }) {
  const { user, loading, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isTransparent = variant === "transparent";

  if (loading) {
    return (
      <div
        className={cn(
          "h-10 w-10 animate-pulse rounded-full",
          isTransparent ? "bg-white/10" : "bg-zinc-100",
        )}
      />
    );
  }

  if (!user) {
    return (
      <>
        <button
          type="button"
          onClick={() => setAuthOpen(true)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border transition",
            isTransparent
              ? "border-white/30 text-white hover:bg-white hover:text-zinc-900"
              : "border-zinc-200 text-zinc-700 hover:bg-zinc-50",
          )}
          aria-label="Войти"
        >
          <UserIcon className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  const initial = user.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition",
          isTransparent
            ? "bg-white/10 text-white hover:bg-white hover:text-zinc-900"
            : "bg-zinc-900 text-white hover:bg-zinc-700",
        )}
        aria-label="Меню пользователя"
      >
        {initial}
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-12 z-40 w-64 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
            <div className="border-b border-zinc-100 p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                Аккаунт
              </p>
              <p className="mt-1 truncate text-sm font-medium text-zinc-900">
                {user.email}
              </p>
            </div>
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50"
            >
              Личный кабинет
            </Link>
            <button
              type="button"
              onClick={async () => {
                await signOut();
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 border-t border-zinc-100 px-4 py-3 text-left text-sm text-zinc-700 transition hover:bg-zinc-50"
            >
              <LogOut className="h-4 w-4" />
              Выйти
            </button>
          </div>
        </>
      )}
    </div>
  );
}
