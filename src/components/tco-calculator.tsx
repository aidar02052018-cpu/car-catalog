"use client";

import { useState } from "react";

import { AnimatedPrice, Reveal } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";
import { type Car, formatPrice } from "@/lib/cars";
import { annualKasko, calculateTCO } from "@/lib/tco";

const PERIODS = [3, 5] as const;
const KM_OPTIONS = [10000, 20000, 30000];

export function TCOCalculator({ car }: { car: Car }) {
  const [years, setYears] = useState<3 | 5>(3);
  const [kmPerYear, setKmPerYear] = useState(20000);
  const [withKasko, setWithKasko] = useState(false);

  const result = calculateTCO(car, { years, kmPerYear, withKasko });
  const yearsWord = years === 3 ? "года" : "лет";

  return (
    <section className="border-t border-zinc-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Стоимость владения
          </p>
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-5xl">
            Сколько на самом деле стоит{" "}
            <span className="italic text-zinc-500">эта машина</span>
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-600">
            Полная стоимость за {years} {yearsWord} с учётом топлива, налогов,
            страхования и ТО — минус остаточная цена при продаже.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="space-y-8">
            <Group title="Период">
              <div className="flex flex-wrap gap-2">
                {PERIODS.map((y) => (
                  <Pill
                    key={y}
                    selected={years === y}
                    onClick={() => setYears(y)}
                  >
                    {y} {y === 3 ? "года" : "лет"}
                  </Pill>
                ))}
              </div>
            </Group>

            <Group title="Пробег в год">
              <div className="flex flex-wrap gap-2">
                {KM_OPTIONS.map((km) => (
                  <Pill
                    key={km}
                    selected={kmPerYear === km}
                    onClick={() => setKmPerYear(km)}
                  >
                    {km / 1000} тыс. км
                  </Pill>
                ))}
              </div>
            </Group>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4">
              <div>
                <p className="font-medium text-zinc-900">Учитывать КАСКО</p>
                <p className="mt-0.5 text-sm text-zinc-500">
                  ≈ {formatPrice(annualKasko(car))}/год
                </p>
              </div>
              <button
                type="button"
                aria-pressed={withKasko}
                onClick={() => setWithKasko((v) => !v)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition",
                  withKasko ? "bg-zinc-900" : "bg-zinc-300",
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white shadow transition",
                    withKasko ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </button>
            </label>

            <div className="rounded-2xl bg-white p-5 text-sm text-zinc-600">
              <p className="font-medium text-zinc-900">
                Что считаем
              </p>
              <ul className="mt-3 space-y-1.5">
                <li>• Топливо при текущем расходе и цене {result.lines[0].perYear > 0 ? "65 ₽/л" : "0"}</li>
                <li>• Транспортный налог по ставкам Москвы</li>
                <li>• ОСАГО для опытного водителя</li>
                <li>• Плановое ТО у официального дилера</li>
                <li>• Минус ориентировочная остаточная цена на рынке через {years} {yearsWord}</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl bg-zinc-950 p-8 text-white shadow-xl md:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">
              Чистая стоимость владения
            </p>
            <AnimatedPrice
              value={result.netCost}
              className="mt-2 block font-heading text-4xl font-medium md:text-5xl"
            />
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/70">
              <span>≈ {formatPrice(result.costPerMonth)} в месяц</span>
              <span>≈ {result.costPerKm.toLocaleString("ru-RU")} ₽ за км</span>
            </div>

            <hr className="my-8 border-white/10" />

            <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">
              Из чего складывается за {years} {yearsWord}
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <BreakdownLine label="Покупка" value={result.acquisition} />
              {result.lines.map((line) => (
                <BreakdownLine
                  key={line.label}
                  label={line.label}
                  value={line.total}
                />
              ))}
              <li className="flex justify-between gap-4 border-t border-white/10 pt-3 font-medium">
                <span className="text-white/70">Всего затрат</span>
                <span>{formatPrice(result.totalCost)}</span>
              </li>
              <li className="flex justify-between gap-4 text-emerald-300">
                <span>− Остаточная цена при продаже</span>
                <span>{formatPrice(result.residualValue)}</span>
              </li>
            </ul>

            <p className="mt-8 text-xs leading-relaxed text-white/50">
              Расчёт ориентировочный. Точные суммы зависят от региона, стиля
              езды, страховой истории и состояния рынка б/у. Электромобили
              освобождены от транспортного налога в Москве.
            </p>
          </div>
        </div>
      </div>
    </section>
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

function Pill({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-5 py-2 text-sm font-medium transition",
        selected
          ? "bg-zinc-900 text-white"
          : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400",
      )}
    >
      {children}
    </button>
  );
}

function BreakdownLine({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex justify-between gap-4">
      <span className="text-white/70">{label}</span>
      <span>{formatPrice(value)}</span>
    </li>
  );
}
