"use client";

import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";

import { CompareButton } from "@/components/compare-button";
import { FavoriteButton } from "@/components/favorite-button";
import { Reveal } from "@/components/motion-primitives";
import { SiteHeader } from "@/components/site-header";
import { BODY_LABELS, formatPrice, getCar } from "@/lib/cars";
import { useFavorites } from "@/lib/use-favorites";

export default function FavoritesPage() {
  const { ids, clear } = useFavorites();
  const cars = ids
    .map((id) => getCar(id))
    .filter((c): c is NonNullable<ReturnType<typeof getCar>> => Boolean(c));

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <SiteHeader />

      <section className="border-b border-zinc-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <Reveal>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Избранное
            </p>
            <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
              Сохранённые модели
            </h1>
            <p className="mt-4 text-zinc-600">
              {cars.length === 0
                ? "Пока пусто"
                : `${cars.length} ${cars.length === 1 ? "модель" : cars.length < 5 ? "модели" : "моделей"} в избранном`}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        {cars.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center">
            <Heart className="mx-auto h-8 w-8 text-zinc-300" strokeWidth={1.5} />
            <p className="mt-4 font-heading text-2xl">Пока ничего</p>
            <p className="mt-2 text-zinc-600">
              Нажмите ♡ на любой карточке в каталоге — машина появится здесь.
            </p>
            <Link
              href="/catalog"
              className="mt-6 inline-flex h-11 items-center justify-center gap-1 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              В каталог
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-end">
              <button
                type="button"
                onClick={clear}
                className="text-sm text-zinc-500 transition hover:text-zinc-900"
              >
                Очистить всё
              </button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cars.map((car) => (
                <Link key={car.id} href={`/catalog/${car.id}`}>
                  <div className="group h-full overflow-hidden rounded-2xl border border-zinc-200/70 bg-white transition hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden bg-zinc-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${car.image}')` }}
                      />
                      <div className="absolute right-3 top-3 flex items-center gap-2">
                        <CompareButton carId={car.id} />
                        <FavoriteButton carId={car.id} />
                      </div>
                    </div>
                    <div className="space-y-1 p-6">
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                        {BODY_LABELS[car.body]}
                      </p>
                      <h3 className="font-heading text-lg font-medium">{car.name}</h3>
                      <p className="text-sm text-zinc-500">{car.brand}</p>
                      <p className="pt-2 text-zinc-700">{formatPrice(car.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
