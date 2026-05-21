import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Car as CarIcon,
  Check,
  Fuel,
  Gauge,
  KeyRound,
  Timer,
  Zap,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BODY_LABELS,
  cars,
  FUEL_LABELS,
  formatPrice,
  getCar,
  getSimilarCars,
  TRANSMISSION_LABELS,
} from "@/lib/cars";
import { PriceCalculator } from "./price-calculator";

export function generateStaticParams() {
  return cars.map((c) => ({ id: c.id }));
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  const similar = getSimilarCars(car);

  const specs = [
    { icon: KeyRound, label: "Двигатель", value: car.engine },
    { icon: Zap, label: "Мощность", value: `${car.power} л.с.` },
    { icon: Timer, label: "Разгон 0–100", value: `${car.acceleration} с` },
    { icon: Gauge, label: "Макс. скорость", value: `${car.topSpeed} км/ч` },
    { icon: Fuel, label: "Расход", value: car.consumption },
    {
      icon: BadgeCheck,
      label: "Коробка",
      value: TRANSMISSION_LABELS[car.transmission],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-2">
            <CarIcon className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-base font-medium tracking-[0.2em]">АВТОДОМ</span>
          </Link>
          <nav className="hidden gap-10 text-sm font-medium text-zinc-600 md:flex">
            <Link href="/" className="hover:text-zinc-900">Главная</Link>
            <Link href="/catalog" className="hover:text-zinc-900">Каталог</Link>
            <Link href="/#advantages" className="hover:text-zinc-900">Преимущества</Link>
            <Link href="/#contact" className="hover:text-zinc-900">Контакты</Link>
          </nav>
          <Button size="sm" variant="outline">Записаться</Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-10">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к каталогу
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:items-start">
          <div className="lg:sticky lg:top-24">
            <div className="relative h-[320px] overflow-hidden rounded-3xl bg-zinc-100 md:h-[480px] lg:h-[560px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${car.image}')` }}
              />
              <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-zinc-700 backdrop-blur">
                {car.year} · в наличии
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                {BODY_LABELS[car.body]} · {FUEL_LABELS[car.fuel]}
              </p>
              <h1 className="mt-3 font-heading text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                {car.name}
              </h1>
              <p className="mt-2 text-zinc-500">{car.brand}</p>
              <p className="mt-6 leading-relaxed text-zinc-600">{car.description}</p>
            </div>
          </div>

          <PriceCalculator car={car} />
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Характеристики
          </p>
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
            Технические данные
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-zinc-200 bg-white p-6"
                >
                  <Icon className="h-6 w-6 text-zinc-900" strokeWidth={1.25} />
                  <p className="mt-4 text-xs uppercase tracking-[0.15em] text-zinc-500">
                    {s.label}
                  </p>
                  <p className="mt-1 font-heading text-2xl font-medium">{s.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Комплектация
        </p>
        <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
          Что входит в базовую версию
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {car.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-zinc-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {similar.length > 0 && (
        <section className="border-t border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Похожие модели
                </p>
                <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
                  Тоже {BODY_LABELS[car.body].toLowerCase()}
                </h2>
              </div>
              <Link
                href="/catalog"
                className="hidden text-sm font-medium text-zinc-900 md:inline-flex md:items-center md:gap-2"
              >
                Весь каталог
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => (
                <Link key={s.id} href={`/catalog/${s.id}`}>
                  <Card className="group overflow-hidden border-zinc-200/70 bg-white py-0 shadow-none transition hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden bg-zinc-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${s.image}')` }}
                      />
                    </div>
                    <CardContent className="space-y-2 p-6">
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                        {BODY_LABELS[s.body]}
                      </p>
                      <h3 className="font-heading text-xl font-medium">{s.name}</h3>
                      <p className="text-sm text-zinc-700">{formatPrice(s.price)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-zinc-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16 text-center lg:px-10 lg:py-20">
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
            Готовы к тест-драйву?
          </h2>
          <p className="mx-auto max-w-md text-white/70">
            Запишитесь онлайн — менеджер подтвердит время в течение 15 минут.
          </p>
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-full bg-white px-7 text-zinc-900 hover:bg-zinc-200",
              )}
            >
              Оставить заявку
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href="/catalog"
              className={cn(
                buttonVariants({ size: "lg", variant: "ghost" }),
                "h-12 rounded-full px-7 text-white hover:bg-white/10 hover:text-white",
              )}
            >
              Смотреть другие модели
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-950 text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm md:flex-row lg:px-10">
          <div className="flex items-center gap-2">
            <CarIcon className="h-4 w-4" strokeWidth={1.5} />
            <span className="tracking-[0.2em]">АВТОДОМ</span>
          </div>
          <p>© 2026 АвтоДом. Учебный проект.</p>
        </div>
      </footer>
    </div>
  );
}
