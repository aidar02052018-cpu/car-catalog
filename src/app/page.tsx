import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { BODY_LABELS, cars, formatPrice } from "@/lib/cars";
import {
  ArrowUpRight,
  BadgeCheck,
  Calculator,
  Car,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const featured = cars.slice(0, 4);

const advantages = [
  {
    icon: Calculator,
    title: "Честная финальная цена",
    text: "Калькулятор считает итог с опциями, КАСКО и допами сразу — без «уточняйте в салоне».",
  },
  {
    icon: BadgeCheck,
    title: "Тест-драйв за 5 минут",
    text: "Запишитесь онлайн — машина будет готова к указанному времени, без ожидания.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия 5 лет",
    text: "Расширенная заводская гарантия и собственный сервисный центр в каждом городе.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-2 text-white">
            <Car className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-lg font-medium tracking-[0.2em]">АВТОДОМ</span>
          </div>
          <nav className="hidden gap-10 text-sm font-medium text-white/80 md:flex">
            <Link href="/catalog" className="transition hover:text-white">Каталог</Link>
            <a href="#advantages" className="transition hover:text-white">Преимущества</a>
            <a href="#calculator" className="transition hover:text-white">Калькулятор</a>
            <a href="#contact" className="transition hover:text-white">Контакты</a>
          </nav>
          <Button
            size="sm"
            variant="outline"
            className="border-white/30 bg-white/0 text-white hover:bg-white hover:text-zinc-900"
          >
            Записаться
          </Button>
        </div>
      </header>

      <section className="relative isolate min-h-[100svh] overflow-hidden bg-zinc-950 text-white">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Коллекция 2026
            </div>
            <h1 className="font-heading text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]">
              Автомобиль,
              <br />
              <span className="italic text-white/70">подобранный для вас</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/70">
              Прозрачные цены, тест-драйв за день и сервис, в который возвращаются. Никаких «уточняйте по телефону».
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/catalog"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-full bg-white px-7 text-zinc-900 hover:bg-zinc-200",
                )}
              >
                Смотреть каталог
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
              <Button
                size="lg"
                variant="ghost"
                className="h-12 rounded-full px-7 text-white hover:bg-white/10 hover:text-white"
              >
                <Phone className="mr-2 h-4 w-4" />
                Заказать звонок
              </Button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 text-sm md:grid-cols-4">
            <div>
              <div className="font-heading text-3xl font-medium">12+</div>
              <div className="mt-1 text-white/60">лет на рынке</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-medium">38</div>
              <div className="mt-1 text-white/60">брендов в каталоге</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-medium">24 700</div>
              <div className="mt-1 text-white/60">довольных клиентов</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-medium">15 мин</div>
              <div className="mt-1 text-white/60">до перезвона менеджера</div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Каталог
              </p>
              <h2 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
                Популярные модели
              </h2>
              <p className="mt-4 text-zinc-600">
                Лидеры продаж текущего сезона. Цена в карточке — финальная, с учётом базовой комплектации.
              </p>
            </div>
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-900"
            >
              Весь каталог
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((m) => (
              <Link key={m.id} href={`/catalog/${m.id}`}>
                <Card className="group h-full overflow-hidden border-zinc-200/70 bg-white py-0 shadow-none transition hover:shadow-xl">
                  <div className="relative h-52 overflow-hidden bg-zinc-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${m.image}')` }}
                    />
                    <div className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-zinc-700 backdrop-blur">
                      {m.year}
                    </div>
                  </div>
                  <CardContent className="space-y-2 p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                      {BODY_LABELS[m.body]}
                    </p>
                    <h3 className="font-heading text-xl font-medium">{m.name}</h3>
                    <p className="text-zinc-700">{formatPrice(m.price)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="advantages" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Почему мы
            </p>
            <h2 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
              Покупка машины <span className="italic text-zinc-500">без сюрпризов</span>
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {advantages.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="border-t border-zinc-200 pt-8">
                  <Icon className="h-7 w-7 text-zinc-900" strokeWidth={1.25} />
                  <h3 className="mt-6 font-heading text-2xl font-medium">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-zinc-600">{a.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                Связаться
              </p>
              <h2 className="font-heading text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                Оставьте заявку — <br />
                <span className="italic text-white/70">перезвоним за 15 минут</span>
              </h2>
              <p className="mt-6 max-w-md text-white/70">
                Расскажем про наличие, поможем выбрать комплектацию и подберём финансирование под ваш бюджет.
              </p>
              <dl className="mt-12 space-y-5 text-sm">
                <div className="flex items-baseline gap-6 border-t border-white/10 pt-5">
                  <dt className="w-20 shrink-0 text-white/50">Телефон</dt>
                  <dd>+7 (495) 123-45-67</dd>
                </div>
                <div className="flex items-baseline gap-6 border-t border-white/10 pt-5">
                  <dt className="w-20 shrink-0 text-white/50">Email</dt>
                  <dd>hello@avtodom.ru</dd>
                </div>
                <div className="flex items-baseline gap-6 border-t border-white/10 pt-5">
                  <dt className="w-20 shrink-0 text-white/50">Адрес</dt>
                  <dd>Москва, ул. Примерная, 1</dd>
                </div>
              </dl>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-950 text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm md:flex-row lg:px-10">
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
