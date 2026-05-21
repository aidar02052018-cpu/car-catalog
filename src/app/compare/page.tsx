"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { ArrowUpRight, X } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/motion-primitives";
import {
  BODY_LABELS,
  FUEL_LABELS,
  TRANSMISSION_LABELS,
  formatPrice,
  getCar,
  type Car,
} from "@/lib/cars";
import { useCompare } from "@/lib/use-compare";

type Row = { label: string; value: (c: Car) => string; highlight?: boolean };

const ROWS: Row[] = [
  { label: "Финальная цена", value: (c) => formatPrice(c.price), highlight: true },
  { label: "Тип кузова", value: (c) => BODY_LABELS[c.body] },
  { label: "Год", value: (c) => String(c.year) },
  { label: "Двигатель", value: (c) => c.engine },
  { label: "Мощность", value: (c) => `${c.power} л.с.` },
  { label: "Разгон 0–100", value: (c) => `${c.acceleration} с` },
  { label: "Макс. скорость", value: (c) => `${c.topSpeed} км/ч` },
  { label: "Расход", value: (c) => c.consumption },
  { label: "Топливо", value: (c) => FUEL_LABELS[c.fuel] },
  { label: "Коробка", value: (c) => TRANSMISSION_LABELS[c.transmission] },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <SiteHeader />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <CompareContent />
      </Suspense>
    </div>
  );
}

function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const compare = useCompare();

  const idsParam = searchParams.get("ids") ?? "";
  const ids = useMemo(
    () => idsParam.split(",").filter(Boolean),
    [idsParam],
  );

  useEffect(() => {
    if (ids.length === 0) return;
    const same =
      ids.length === compare.ids.length &&
      ids.every((id, i) => compare.ids[i] === id);
    if (!same) {
      compare.clear();
      ids.forEach((id) => compare.add(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsParam]);

  const cars = ids
    .map((id) => getCar(id))
    .filter((c): c is Car => Boolean(c));

  const removeCar = (id: string) => {
    const newIds = cars.filter((c) => c.id !== id).map((c) => c.id);
    compare.remove(id);
    if (newIds.length === 0) {
      router.replace("/compare");
    } else {
      router.replace(`/compare?ids=${newIds.join(",")}`);
    }
  };

  if (cars.length === 0) {
    return (
      <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-32 text-center lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Сравнение
        </p>
        <h1 className="mt-4 font-heading text-4xl font-medium md:text-5xl">
          Сравнения пока пусто
        </h1>
        <p className="mt-4 max-w-md text-zinc-600">
          Откройте каталог и нажмите иконку «Сравнить» на карточке любой модели — она появится здесь.
        </p>
        <Link
          href="/catalog"
          className="mt-8 inline-flex h-12 items-center justify-center gap-1 rounded-full bg-zinc-900 px-7 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          В каталог
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </main>
    );
  }

  const gridCols = `220px repeat(${cars.length}, minmax(220px, 1fr))`;

  return (
    <>
      <section className="border-b border-zinc-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <Reveal>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Сравнение
            </p>
            <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
              {cars.length === 1
                ? "Одна модель — добавьте ещё"
                : `${cars.length} модели бок о бок`}
            </h1>
            <p className="mt-4 text-zinc-600">
              Финальные цены, технические характеристики и комплектация — на одном экране.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="overflow-x-auto pb-20">
          <div className="min-w-full">
            <div
              className="grid items-end gap-4"
              style={{ gridTemplateColumns: gridCols }}
            >
              <div />
              {cars.map((car) => (
                <div key={car.id} className="relative">
                  <button
                    type="button"
                    onClick={() => removeCar(car.id)}
                    aria-label="Убрать из сравнения"
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-zinc-700 shadow-sm transition hover:bg-white hover:text-zinc-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <Link href={`/catalog/${car.id}`}>
                    <div
                      className="aspect-[4/3] overflow-hidden rounded-2xl bg-cover bg-center bg-stone-100 transition hover:scale-[1.02]"
                      style={{ backgroundImage: `url('${car.image}')` }}
                    />
                  </Link>
                  <div className="mt-4">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                      {car.brand}
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-medium">
                      {car.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 divide-y divide-zinc-100 border-y border-zinc-200">
              {ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-4 py-5"
                  style={{ gridTemplateColumns: gridCols }}
                >
                  <div className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                    {row.label}
                  </div>
                  {cars.map((car) => (
                    <div
                      key={car.id}
                      className={
                        row.highlight
                          ? "font-heading text-xl font-medium text-zinc-900"
                          : "text-sm text-zinc-800"
                      }
                    >
                      {row.value(car)}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div
              className="mt-8 grid gap-4"
              style={{ gridTemplateColumns: gridCols }}
            >
              <div />
              {cars.map((car) => (
                <Link
                  key={car.id}
                  href={`/catalog/${car.id}`}
                  className="inline-flex h-11 items-center justify-center gap-1 rounded-full bg-zinc-900 text-sm font-medium text-white transition hover:bg-zinc-700"
                >
                  Подробнее
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {cars.length < 4 && (
          <div className="mt-12 flex flex-col items-start gap-3 rounded-3xl border border-dashed border-zinc-300 p-8 text-zinc-600 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-zinc-900">Добавьте ещё модели</p>
              <p className="mt-1 text-sm">
                В сравнении можно держать до 4 машин одновременно.
              </p>
            </div>
            <Link
              href="/catalog"
              className="inline-flex h-11 items-center justify-center gap-1 rounded-full border border-zinc-300 px-5 text-sm font-medium transition hover:bg-zinc-100"
            >
              Открыть каталог
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
