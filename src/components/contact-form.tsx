"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isPhoneComplete, PhoneInput, toE164 } from "@/components/phone-input";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !isPhoneComplete(phone)) return;

    setStatus("submitting");
    setErrorMsg("");

    const { error } = await supabase.from("leads").insert({
      kind: "contact",
      name: name.trim(),
      phone: toE164(phone),
      message: message.trim() || null,
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    setStatus("success");
    setName("");
    setPhone("");
    setMessage("");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-zinc-900">
          <Check className="h-5 w-5" />
        </div>
        <div>
          <p className="font-heading text-2xl">Заявка принята</p>
          <p className="mt-2 text-white/70">Менеджер перезвонит в течение 15 минут.</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm text-white/60 underline hover:text-white"
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white/70">Имя</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Как к вам обращаться"
          className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-white/30"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white/70">Телефон</Label>
        <PhoneInput id="phone" value={phone} onChange={setPhone} variant="dark" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="msg" className="text-white/70">Сообщение</Label>
        <Textarea
          id="msg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Какая модель интересует?"
          rows={4}
          className="border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-white/30"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-300">Не удалось отправить: {errorMsg}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting" || !name.trim() || !isPhoneComplete(phone)}
        className="h-12 w-full rounded-full bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-60"
      >
        {status === "submitting" ? "Отправляем…" : "Отправить заявку"}
      </Button>
      <p className="text-xs leading-relaxed text-white/50">
        Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
      </p>
    </form>
  );
}
