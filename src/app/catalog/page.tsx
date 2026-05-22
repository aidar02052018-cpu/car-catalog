"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Car, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site-header";
import { CompareButton } from "@/components/compare-button";
import { FavoriteButton } from "@/components/favorite-button";
import { Reveal } from "@/components/motion-primitives";
import { motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ALL_BODIES,
  ALL_BRANDS,
  ALL_FUELS,
  BODY_LABELS,
  type BodyType,
  cars,
  formatPrice,
  FUEL_LABELS,
  type Fuel,
} from "@/lib/cars";

type SortKey = "popular" | "price-asc" | "price-desc" | "year-desc";

const SORT_LABELS: Record<SortKey, string> = {
  popular: "Сначала популярные",
  "price-asc": "Цена: по возрастанию",
  "price-desc": "Цена: по убыванию",
  "year-desc": "Сначала новые",
};

export default function CatalogPage() {
  const [brands, setBrands] = useState<string[]>([]);
  const [bodies, setBodies] = useState<BodyType[]>([]);
  const [fuels, setFuels] = useState<Fuel[]>([]);
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const min = priceMin ? Number(priceMin) : 0;
    const max = priceMax ? Number(priceMax) : Infinity;

    const list = cars.filter((c) => {
      if (brands.length && !brands.includes(c.brand)) return false;
      if (bodies.length && !bodies.includes(c.body)) return false;
      if (fuels.length && !fuels.includes(c.fuel)) return false;
      if (c.price < min || c.price > max) return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "year-desc") sorted.sort((a, b) => b.year - a.year);
    return sorted;
  }, [brands, bodies, fuels, priceMin, priceMax, sort]);

  const toggle = <T,>(value: T, list: T[], setter: (v: T[]) => void) => {
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  };

  const resetAll = () => {
    setBrands([]);
    setBodies([]);
    setFuels([]);
    setPriceMin("");
    setPriceMax("");
  };

  const activeFiltersCount =
    brands.length + bodies.length + fuels.length + (priceMin ? 1 : 0) + (priceMax ? 1 : 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <SiteHeader />

      <section className="border-b border-zinc-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <Reveal>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Каталог
            </p>
            <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
              Все модели в наличии
            </h1>
            <p className="mt-4 max-w-xl text-zinc-600">
              {cars.length} автомобилей. Цены — финальные, без скрытых платежей и звонков.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="mb-6 flex items-center justify-between gap-4 md:hidden">
          <Button
            variant="outline"
            onClick={() => setMobileFiltersOpen(true)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Фильтры
            {activeFiltersCount > 0 && (
              <span className="ml-1 rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white">
                {activeFiltersCount}
              </span>
            )}
          </Button>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                <SelectItem key={k} value={k}>{SORT_LABELS[k]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside
            className={`${
              mobileFiltersOpen
                ? "fixed inset-0 z-50 overflow-y-auto bg-white p-6"
                : "hidden lg:block"
            }`}
          >
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <h3 className="font-heading text-2xl">Фильтры</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-8">
              <FilterGroup title="Марка">
                {ALL_BRANDS.map((brand) => (
                  <CheckboxRow
                    key={brand}
                    id={`brand-${brand}`}
                    label={brand}
                    checked={brands.includes(brand)}
                    onChange={() => toggle(brand, brands, setBrands)}
                  />
                ))}
              </FilterGroup>

              <FilterGroup title="Тип кузова">
                {ALL_BODIES.map((b) => (
                  <CheckboxRow
                    key={b}
                    id={`body-${b}`}
                    label={BODY_LABELS[b]}
                    checked={bodies.includes(b)}
                    onChange={() => toggle(b, bodies, setBodies)}
                  />
                ))}
              </FilterGroup>

              <FilterGroup title="Двигатель">
                {ALL_FUELS.map((f) => (
                  <CheckboxRow
                    key={f}
                    id={`fuel-${f}`}
                    label={FUEL_LABELS[f]}
                    checked={fuels.includes(f)}
                    onChange={() => toggle(f, fuels, setFuels)}
                  />
                ))}
              </FilterGroup>

              <FilterGroup title="Цена, ₽">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="min" className="text-xs text-zinc-500">от</Label>
                    <Input
                      id="min"
                      inputMode="numeric"
                      placeholder="0"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="max" className="text-xs text-zinc-500">до</Label>
                    <Input
                      id="max"
                      inputMode="numeric"
                      placeholder="∞"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                </div>
              </FilterGroup>

              {activeFiltersCount > 0 && (
                <Button variant="outline" onClick={resetAll} className="w-full">
                  Сбросить ({activeFiltersCount})
                </Button>
              )}

              <div className="lg:hidden">
                <Button
                  className="w-full"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Показать {filtered.length}
                </Button>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-6 hidden items-center justify-between md:flex">
              <p className="text-sm text-zinc-600">
                Найдено: <span className="font-medium text-zinc-900">{filtered.length}</span>
              </p>
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                    <SelectItem key={k} value={k}>{SORT_LABELS[k]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 py-20 text-center">
                <p className="font-heading text-2xl">Ничего не найдено</p>
                <p className="mt-2 text-zinc-600">Попробуйте смягчить фильтры.</p>
                <Button variant="outline" onClick={resetAll} className="mt-6">
                  Сбросить фильтры
                </Button>
              </div>
            ) : (
              <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((car) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                  <Link href={`/catalog/${car.id}`}>
                    <Card className="group h-full overflow-hidden border-zinc-200/70 bg-white py-0 shadow-none transition hover:shadow-xl">
                      <div className="relative h-52 overflow-hidden bg-zinc-100">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url('${car.image}')` }}
                        />
                        <div className="absolute right-3 top-3 flex items-center gap-2">
                          <FavoriteButton carId={car.id} />
                          <CompareButton carId={car.id} />
                          <span className="rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-zinc-700 backdrop-blur">
                            {car.year}
                          </span>
                        </div>
                      </div>
                      <CardContent className="space-y-4 p-6">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                            {BODY_LABELS[car.body]} · {FUEL_LABELS[car.fuel]}
                          </p>
                          <h3 className="mt-2 font-heading text-xl font-medium">{car.name}</h3>
                          <p className="mt-1 text-sm text-zinc-500">{car.brand}</p>
                        </div>
                        <div className="flex items-end justify-between border-t border-zinc-100 pt-4">
                          <div>
                            <p className="text-xs text-zinc-500">Финальная цена</p>
                            <p className="font-heading text-lg font-medium">
                              {formatPrice(car.price)}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 transition group-hover:gap-2">
                            Подробнее
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-stone-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-zinc-500 md:flex-row lg:px-10">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4" strokeWidth={1.5} />
            <span className="tracking-[0.2em]">АВТОДОМ</span>
          </div>
          <p>© 2026 АвтоДом. Учебный проект.</p>
        </div>
      </footer>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
        {title}
      </h4>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function CheckboxRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 text-sm">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <span className="text-zinc-700">{label}</span>
    </label>
  );
}
