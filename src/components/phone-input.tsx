"use client";

import { cn } from "@/lib/utils";

export function formatPhoneDigits(digits: string): string {
  const d = digits.slice(0, 10);
  if (d.length === 0) return "";
  let r = "(" + d.slice(0, Math.min(3, d.length));
  if (d.length >= 3) r += ") " + d.slice(3, Math.min(6, d.length));
  if (d.length >= 6) r += "-" + d.slice(6, Math.min(8, d.length));
  if (d.length >= 8) r += "-" + d.slice(8, 10);
  return r;
}

export function normalizePhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export const PHONE_REQUIRED_LENGTH = 10;

export function isPhoneComplete(digits: string): boolean {
  return digits.length === PHONE_REQUIRED_LENGTH;
}

export function toE164(digits: string): string {
  return `+7${digits}`;
}

export function PhoneInput({
  value,
  onChange,
  disabled,
  variant = "light",
  id,
}: {
  value: string;
  onChange: (digits: string) => void;
  disabled?: boolean;
  variant?: "light" | "dark";
  id?: string;
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex h-11 items-stretch rounded-md border text-sm transition",
        "focus-within:ring-3",
        isDark
          ? "border-white/15 bg-white/5 focus-within:border-white/40 focus-within:ring-white/30"
          : "border-input bg-background focus-within:border-ring focus-within:ring-ring/50",
        disabled && "opacity-60",
      )}
    >
      <span
        className={cn(
          "flex items-center pl-3 pr-2 select-none text-sm font-medium",
          isDark ? "text-white/70" : "text-zinc-600",
        )}
      >
        +7
      </span>
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="(___) ___-__-__"
        value={formatPhoneDigits(value)}
        onChange={(e) => onChange(normalizePhoneInput(e.target.value))}
        onPaste={(e) => {
          e.preventDefault();
          const pasted = e.clipboardData.getData("text");
          onChange(normalizePhoneInput(pasted));
        }}
        disabled={disabled}
        className={cn(
          "flex-1 bg-transparent px-2 outline-none placeholder:opacity-60",
          isDark
            ? "text-white placeholder:text-white/40"
            : "text-foreground placeholder:text-muted-foreground",
          disabled && "cursor-not-allowed",
        )}
      />
    </div>
  );
}
