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

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CompareButton } from "@/components/compare-button";
import { FavoriteButton } from "@/components/favorite-button";
import { TiltCard } from "@/components/tilt-card";
import { SiteHeader } from "@/components/site-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
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
import { TCOCalculator } from "@/components/tco-calculator";
import { VideoSection } from "@/components/video-section";

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
      <SiteHeader />

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
              <div className="absolute right-4 top-4 flex items-center gap-2">
                <FavoriteButton carId={car.id} />
                <CompareButton carId={car.id} />
                <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-zinc-700 backdrop-blur">
                  {car.year} · в наличии
                </span>
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

      <section className="border-t border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Характеристики
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight md:text-5xl">
                Технические <span className="italic text-white/60">данные</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-white/60">
              Базовые параметры комплектации. Полный лист характеристик придёт после заявки на тест-драйв.
            </p>
          </div>

          <Stagger className="mt-12 divide-y divide-white/10 border-y border-white/10 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:border-x">
            {specs.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem
                  key={s.label}
                  className="group flex items-center gap-6 px-2 py-6 lg:flex-col lg:items-start lg:gap-4 lg:px-8 lg:py-10"
                >
                  <Icon
                    className="h-7 w-7 shrink-0 text-white/60 transition group-hover:text-white"
                    strokeWidth={1.25}
                  />
                  <div className="flex-1 lg:w-full">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/50">
                      {s.label}
                    </p>
                    <p className="mt-1 text-2xl font-medium tracking-tight md:text-3xl">
                      {s.value}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <TCOCalculator car={car} />

      <VideoSection car={car} />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Комплектация
          </p>
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
            Что входит в базовую версию
          </h2>
        </Reveal>
        <Stagger
          className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
          staggerChildren={0.04}
        >
          {car.features.map((f) => (
            <StaggerItem
              key={f}
              className="flex items-start gap-3 text-sm text-zinc-700"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900" />
              <span>{f}</span>
            </StaggerItem>
          ))}
        </Stagger>
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
                <TiltCard key={s.id} maxTilt={6}>
                <Link href={`/catalog/${s.id}`}>
                  <Card className="group overflow-hidden border-zinc-200/70 bg-white py-0 shadow-none transition hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden bg-zinc-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${s.image}')` }}
                      />
                      <div className="absolute right-3 top-3 flex items-center gap-2">
                        <FavoriteButton carId={s.id} />
                        <CompareButton carId={s.id} />
                      </div>
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
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-zinc-950 text-white">
        <Reveal className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16 text-center lg:px-10 lg:py-20">
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
            Готовы к тест-драйву?
          </h2>
          <p className="mx-auto max-w-md text-white/70">
            Запишитесь онлайн — менеджер подтвердит время в течение 15 минут.
          </p>
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex h-12 items-center justify-center gap-1 rounded-full bg-white px-7 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
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
        </Reveal>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-950 text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm md:flex-row lg:px-10">
          <div className="flex items-center gap-2">
            <CarIcon className="h-4 w-4" strokeWidth={1.5} />
            <span className="tracking-[0.15em]">ПРАЙМ · ПРАЙС</span>
          </div>
          <p>© 2026 Прайм Прайс. Учебный проект.</p>
        </div>
      </footer>
    </div>
  );
}
