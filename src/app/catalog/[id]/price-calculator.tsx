"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Calculator, Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { formatPrice, type Car } from "@/lib/cars";
import {
  COLORS,
  CREDIT_TERMS,
  EXTRAS,
  INTERIORS,
  monthlyPayment,
  TRIMS,
  WHEELS,
  type CreditTerm,
} from "@/lib/configurator";
import { supabase, type LeadKind } from "@/lib/supabase";
import { isPhoneComplete, PhoneInput, toE164 } from "@/components/phone-input";
import { AnimatedPrice } from "@/components/motion-primitives";

type PaymentMode = "cash" | "credit";
type SubmitState =
  | { mode: "idle" }
  | { mode: "form"; kind: LeadKind }
  | { mode: "submitting" }
  | { mode: "success"; kind: LeadKind }
  | { mode: "error"; message: string };

export function PriceCalculator({ car }: { car: Car }) {
  const [trim, setTrim] = useState(TRIMS[0].id);
  const [color, setColor] = useState(COLORS[0].id);
  const [wheels, setWheels] = useState(WHEELS[0].id);
  const [interior, setInterior] = useState(INTERIORS[0].id);
  const [extras, setExtras] = useState<string[]>([]);
  const [payment, setPayment] = useState<PaymentMode>("cash");
  const [downPercent, setDownPercent] = useState("30");
  const [term, setTerm] = useState<CreditTerm>(36);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [submit, setSubmit] = useState<SubmitState>({ mode: "idle" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const trimItem = TRIMS.find((t) => t.id === trim)!;
  const colorItem = COLORS.find((c) => c.id === color)!;
  const wheelsItem = WHEELS.find((w) => w.id === wheels)!;
  const interiorItem = INTERIORS.find((i) => i.id === interior)!;
  const extraItems = EXTRAS.filter((e) => extras.includes(e.id));

  const total = useMemo(() => {
    return (
      car.price +
      trimItem.price +
      colorItem.price +
      wheelsItem.price +
      interiorItem.price +
      extraItems.reduce((sum, e) => sum + e.price, 0)
    );
  }, [car.price, trimItem, colorItem, wheelsItem, interiorItem, extraItems]);

  const extrasTotal = trimItem.price +
    colorItem.price +
    wheelsItem.price +
    interiorItem.price +
    extraItems.reduce((sum, e) => sum + e.price, 0);

  const down = Math.min(100, Math.max(0, Number(downPercent) || 0));
  const downAmount = Math.round((total * down) / 100);
  const loanAmount = total - downAmount;
  const monthly = Math.round(monthlyPayment(loanAmount, term));

  const toggleExtra = (id: string) => {
    setExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const config = {
    trim: trimItem.label,
    color: colorItem.label,
    wheels: wheelsItem.label,
    interior: interiorItem.label,
    extras: extraItems.map((e) => e.label),
    payment,
    ...(payment === "credit" && {
      down_percent: down,
      term_months: term,
      monthly,
    }),
  };

  async function handleSubmit(kind: LeadKind) {
    if (!name.trim() || !isPhoneComplete(phone)) return;
    setSubmit({ mode: "submitting" });

    const { error } = await supabase.from("leads").insert({
      kind,
      name: name.trim(),
      phone: toE164(phone),
      car_id: car.id,
      car_name: car.name,
      config,
      total_price: total,
    });

    if (error) {
      setSubmit({ mode: "error", message: error.message });
      return;
    }

    setSubmit({ mode: "success", kind });
    setName("");
    setPhone("");
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-stone-50 px-6 py-4">
        <Calculator className="h-4 w-4" strokeWidth={1.5} />
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-600">
          Калькулятор честной цены
        </span>
      </div>

      <div className="space-y-7 p-6">
        <Group title="Комплектация">
          <div className="grid gap-2">
            {TRIMS.map((t) => (
              <OptionButton
                key={t.id}
                selected={trim === t.id}
                onClick={() => setTrim(t.id)}
                title={t.label}
                subtitle={t.description}
                priceLabel={t.price === 0 ? "включено" : `+ ${formatPrice(t.price)}`}
              />
            ))}
          </div>
        </Group>

        <Group title="Цвет кузова">
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.id)}
                title={c.label}
                className={cn(
                  "group relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition",
                  color === c.id ? "border-zinc-900" : "border-zinc-200 hover:border-zinc-400"
                )}
              >
                <span
                  className="block h-8 w-8 rounded-full border border-zinc-200"
                  style={{ backgroundColor: c.hex }}
                />
                {color === c.id && (
                  <Check className="absolute h-4 w-4 text-white mix-blend-difference" />
                )}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            {colorItem.label}
            {colorItem.price > 0 && ` · +${formatPrice(colorItem.price)}`}
          </p>
        </Group>

        <Group title="Диски">
          <div className="grid gap-2">
            {WHEELS.map((w) => (
              <OptionButton
                key={w.id}
                selected={wheels === w.id}
                onClick={() => setWheels(w.id)}
                title={w.label}
                priceLabel={w.price === 0 ? "включено" : `+ ${formatPrice(w.price)}`}
              />
            ))}
          </div>
        </Group>

        <Group title="Салон">
          <div className="grid gap-2">
            {INTERIORS.map((i) => (
              <OptionButton
                key={i.id}
                selected={interior === i.id}
                onClick={() => setInterior(i.id)}
                title={i.label}
                priceLabel={i.price === 0 ? "включено" : `+ ${formatPrice(i.price)}`}
              />
            ))}
          </div>
        </Group>

        <Group title="Дополнительно">
          <div className="space-y-2">
            {EXTRAS.map((e) => {
              const checked = extras.includes(e.id);
              return (
                <label
                  key={e.id}
                  htmlFor={`extra-${e.id}`}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 text-sm transition",
                    checked
                      ? "border-zinc-900 bg-zinc-50"
                      : "border-zinc-200 hover:border-zinc-300"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Checkbox
                      id={`extra-${e.id}`}
                      checked={checked}
                      onCheckedChange={() => toggleExtra(e.id)}
                    />
                    <span className="text-zinc-800">{e.label}</span>
                  </span>
                  <span className="text-zinc-600">+ {formatPrice(e.price)}</span>
                </label>
              );
            })}
          </div>
        </Group>

        <Group title="Способ оплаты">
          <div className="grid grid-cols-2 gap-2">
            {(["cash", "credit"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setPayment(mode)}
                className={cn(
                  "rounded-xl border p-3 text-sm font-medium transition",
                  payment === mode
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 text-zinc-700 hover:border-zinc-300"
                )}
              >
                {mode === "cash" ? "Наличными" : "В кредит"}
              </button>
            ))}
          </div>

          {payment === "credit" && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="down" className="text-xs text-zinc-500">
                  Первый взнос, %
                </Label>
                <Input
                  id="down"
                  inputMode="numeric"
                  value={downPercent}
                  onChange={(e) =>
                    setDownPercent(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-500">Срок, мес.</Label>
                <Select
                  value={String(term)}
                  onValueChange={(v) => setTerm(Number(v) as CreditTerm)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CREDIT_TERMS.map((t) => (
                      <SelectItem key={t} value={String(t)}>
                        {t} мес.
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </Group>

        <button
          type="button"
          onClick={() => setBreakdownOpen((v) => !v)}
          className="flex w-full items-center justify-between text-xs font-medium uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-900"
        >
          <span>Детализация {extrasTotal > 0 && `(+ ${formatPrice(extrasTotal)})`}</span>
          <ChevronDown
            className={cn("h-4 w-4 transition", breakdownOpen && "rotate-180")}
          />
        </button>
        {breakdownOpen && (
          <div className="space-y-2 rounded-xl bg-stone-50 p-4 text-sm">
            <BreakdownRow label="Базовая цена" value={car.price} />
            {trimItem.price > 0 && (
              <BreakdownRow label={`Комплектация: ${trimItem.label}`} value={trimItem.price} />
            )}
            {colorItem.price > 0 && (
              <BreakdownRow label={`Цвет: ${colorItem.label}`} value={colorItem.price} />
            )}
            {wheelsItem.price > 0 && (
              <BreakdownRow label={`Диски: ${wheelsItem.label}`} value={wheelsItem.price} />
            )}
            {interiorItem.price > 0 && (
              <BreakdownRow label={`Салон: ${interiorItem.label}`} value={interiorItem.price} />
            )}
            {extraItems.map((e) => (
              <BreakdownRow key={e.id} label={e.label} value={e.price} />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200 bg-zinc-950 p-6 text-white">
        {payment === "cash" ? (
          <>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">
              Итого к оплате
            </p>
            <AnimatedPrice value={total} className="mt-1 block font-heading text-4xl font-medium" />
            <p className="mt-2 text-xs text-white/50">
              Без скрытых платежей. Цена фиксируется в договоре.
            </p>
          </>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">
              Платёж в месяц
            </p>
            <AnimatedPrice value={monthly} className="mt-1 block font-heading text-4xl font-medium" />
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/60">
              <span>Итого: {formatPrice(total)}</span>
              <span>Взнос: {formatPrice(downAmount)}</span>
              <span>Срок: {term} мес.</span>
              <span>Ставка: 12% годовых</span>
            </div>
          </>
        )}

        {submit.mode === "idle" && (
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Button
              size="lg"
              onClick={() => setSubmit({ mode: "form", kind: "test_drive" })}
              className="h-12 rounded-full bg-white text-zinc-900 hover:bg-zinc-200"
            >
              Записаться на тест-драйв
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => setSubmit({ mode: "form", kind: "purchase" })}
              className="h-12 rounded-full text-white hover:bg-white/10 hover:text-white"
            >
              Оформить заявку
            </Button>
          </div>
        )}

        {(submit.mode === "form" || submit.mode === "submitting" || submit.mode === "error") && (
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {submit.mode === "form" && submit.kind === "test_drive" && "Запись на тест-драйв"}
                {submit.mode === "form" && submit.kind === "purchase" && "Заявка на покупку"}
                {submit.mode === "submitting" && "Отправляем…"}
                {submit.mode === "error" && "Ошибка отправки"}
              </p>
              <button
                type="button"
                onClick={() => setSubmit({ mode: "idle" })}
                disabled={submit.mode === "submitting"}
                className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white"
              >
                <ArrowLeft className="h-3 w-3" />
                назад
              </button>
            </div>

            <Input
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submit.mode === "submitting"}
              className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-white/30"
            />
            <PhoneInput
              value={phone}
              onChange={setPhone}
              disabled={submit.mode === "submitting"}
              variant="dark"
            />

            {submit.mode === "error" && (
              <p className="text-xs text-red-300">{submit.message}</p>
            )}

            <Button
              size="lg"
              disabled={
                submit.mode === "submitting" || !name.trim() || !isPhoneComplete(phone)
              }
              onClick={() => {
                const kind: LeadKind =
                  submit.mode === "form" ? submit.kind : "test_drive";
                handleSubmit(kind);
              }}
              className="h-12 w-full rounded-full bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-60"
            >
              {submit.mode === "submitting" ? "Отправляем…" : "Отправить"}
              {submit.mode !== "submitting" && <ArrowUpRight className="ml-1 h-4 w-4" />}
            </Button>
            <p className="text-xs leading-relaxed text-white/50">
              К заявке прикрепится текущая конфигурация и итоговая цена.
            </p>
          </div>
        )}

        {submit.mode === "success" && (
          <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl bg-white/5 p-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900">
              <Check className="h-5 w-5" />
            </div>
            <p className="font-heading text-xl">
              {submit.kind === "test_drive" ? "Записали на тест-драйв" : "Заявка принята"}
            </p>
            <p className="text-sm text-white/70">
              Менеджер перезвонит в течение 15 минут.
            </p>
            <button
              type="button"
              onClick={() => setSubmit({ mode: "idle" })}
              className="text-xs text-white/60 underline hover:text-white"
            >
              Отправить ещё одну
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
        {title}
      </h4>
      {children}
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  title,
  subtitle,
  priceLabel,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  priceLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition",
        selected ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"
      )}
    >
      <div>
        <p className="text-sm font-medium text-zinc-900">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>}
      </div>
      <span
        className={cn(
          "shrink-0 text-xs font-medium",
          selected ? "text-zinc-900" : "text-zinc-500"
        )}
      >
        {priceLabel}
      </span>
    </button>
  );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-zinc-700">
      <span>{label}</span>
      <span>{formatPrice(value)}</span>
    </div>
  );
}
