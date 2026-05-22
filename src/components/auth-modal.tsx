"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Mail, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "sending" | "sent" | "error";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/account`
            : undefined,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }
    setStatus("sent");
  }

  const handleClose = () => {
    onClose();
    // Сбросить состояние когда модалка закроется
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
      setErrorMsg("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950/85 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Закрыть"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "sent" ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white">
                  <Check className="h-6 w-6" />
                </div>
                <h2 className="mt-6 font-heading text-2xl font-medium">
                  Ссылка отправлена
                </h2>
                <p className="mt-3 text-zinc-600">
                  Проверь почту {email} — там будет письмо с кнопкой «Войти».
                  Кликни на неё, чтобы залогиниться.
                </p>
                <p className="mt-6 text-xs text-zinc-500">
                  Письмо может прийти в течение минуты. Если не пришло —
                  проверь папку «Спам».
                </p>
              </div>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
                  <Mail className="h-5 w-5 text-zinc-900" />
                </div>
                <h2 className="mt-6 font-heading text-2xl font-medium">
                  Вход в личный кабинет
                </h2>
                <p className="mt-2 text-sm text-zinc-600">
                  Введи email — пришлём ссылку для входа. Пароли не нужны.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="auth-email">Email</Label>
                    <Input
                      id="auth-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoFocus
                      disabled={status === "sending"}
                      className="h-11"
                    />
                  </div>

                  {status === "error" && (
                    <div className="rounded-xl bg-red-50 p-3 text-xs text-red-800">
                      <p className="font-medium">Не удалось отправить: {errorMsg}</p>
                      <p className="mt-1.5 text-red-700">
                        Если ошибка «Failed to fetch» — отключи блокировщик рекламы или антитрекер для этого сайта. Часто uBlock, Adblock или встроенный антитрекер Яндекс.Браузера режут запросы к supabase.co.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending" || !email.trim()}
                    className="h-12 w-full rounded-full disabled:opacity-60"
                  >
                    {status === "sending"
                      ? "Отправляем…"
                      : "Получить ссылку для входа"}
                  </Button>
                </form>

                <p className="mt-6 text-xs leading-relaxed text-zinc-500">
                  Регистрация и вход — одно и то же. Если впервые на сайте —
                  аккаунт создастся автоматически.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
