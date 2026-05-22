import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { CompareButton } from "@/components/compare-button";
import { ContactForm } from "@/components/contact-form";
import { FavoriteButton } from "@/components/favorite-button";
import { HeroSection } from "@/components/hero-section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { SiteHeader } from "@/components/site-header";
import { BODY_LABELS, cars, formatPrice } from "@/lib/cars";
import {
  ArrowUpRight,
  BadgeCheck,
  Calculator,
  Car,
  Check,
  ShieldCheck,
  X,
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
      <SiteHeader variant="transparent" />

      <HeroSection />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Наше отличие
            </p>
            <h2 className="font-heading max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              Цена в каталоге — <br />
              <span className="italic text-zinc-500">
                финальная цена в кассе
              </span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-600">
              80% дилеров пишут «от 3 290 000 ₽» и просят перезвонить. Мы
              показываем все доплаты в калькуляторе — клиент видит итог до
              визита в салон.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-zinc-200 md:grid-cols-2">
            <div className="bg-stone-50 p-8 md:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                У других
              </p>
              <ul className="mt-8 space-y-5">
                {[
                  '«Цена от» — итог узнаёте в салоне',
                  'КАСКО — «обсудим при оформлении»',
                  '«Ставку кредита уточняйте у менеджера»',
                  'Допы — продают «пакетами» без разбивки',
                  'Финальный чек на 15-25% выше прайса',
                ].map((text) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 text-zinc-600"
                  >
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400" strokeWidth={1.5} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-zinc-950 p-8 text-white md:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">
                У нас
              </p>
              <ul className="mt-8 space-y-5">
                {[
                  'Финальная цена с базовой комплектацией — в карточке',
                  'КАСКО на год — отдельной строкой, +95 000 ₽',
                  'Кредит со ставкой 12% годовых, расчёт онлайн',
                  'Каждая опция — отдельной галочкой с ценой',
                  'Сколько в калькуляторе — столько в кассе',
                ].map((text) => (
                  <li
                    key={text}
                    className="flex items-start gap-3"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" strokeWidth={2} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/catalog/bmw-x5"
                className="mt-10 inline-flex h-12 items-center justify-center gap-1 rounded-full bg-white px-7 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
              >
                Открыть калькулятор
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="catalog" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
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
          </Reveal>

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((m) => (
              <StaggerItem key={m.id}>
                <Link href={`/catalog/${m.id}`}>
                  <Card className="group h-full overflow-hidden border-zinc-200/70 bg-white py-0 shadow-none transition hover:shadow-xl">
                    <div className="relative h-52 overflow-hidden bg-zinc-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${m.image}')` }}
                      />
                      <div className="absolute right-3 top-3 flex items-center gap-2">
                        <FavoriteButton carId={m.id} />
                        <CompareButton carId={m.id} />
                        <span className="rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-zinc-700 backdrop-blur">
                          {m.year}
                        </span>
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
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="advantages" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="mb-16 max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Почему мы
            </p>
            <h2 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
              Покупка машины <span className="italic text-zinc-500">без сюрпризов</span>
            </h2>
          </Reveal>
          <Stagger className="grid gap-12 md:grid-cols-3">
            {advantages.map((a) => {
              const Icon = a.icon;
              return (
                <StaggerItem key={a.title} className="border-t border-zinc-200 pt-8">
                  <Icon className="h-7 w-7 text-zinc-900" strokeWidth={1.25} />
                  <h3 className="mt-6 font-heading text-2xl font-medium">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-zinc-600">{a.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section id="contact" className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal>
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
            </Reveal>

            <Reveal delay={0.15}>
              <ContactForm />
            </Reveal>
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
