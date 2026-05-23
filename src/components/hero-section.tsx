"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Phone, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/motion-primitives";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Картинка машины: масштабируется и темнеет по мере прокрутки
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.7, 0.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);

  // Контент: первый блок (заголовок) уезжает вверх и затухает
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0]);

  // Подзаголовок про прозрачность — появляется по центру
  const subtitleOpacity = useTransform(scrollYProgress, [0.35, 0.55, 0.75, 0.85], [0, 1, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.35, 0.55], ["32px", "0%"]);

  // Статистика — появляется в финале
  const statsOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.65, 0.85], ["32px", "0%"]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[180svh] bg-zinc-950 text-white md:min-h-[220svh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Фоновая картинка */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage:
              "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2021_BMW_M4_Competition_Automatic_3.0_Front.jpg/1280px-2021_BMW_M4_Competition_Automatic_3.0_Front.jpg')",
            scale: imageScale,
            opacity: imageOpacity,
          }}
        />
        {/* Затемнения */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
          style={{ opacity: overlayOpacity }}
        />

        {/* Контент — три состояния, плавно сменяющиеся */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 pt-24 lg:px-10 lg:pb-24 lg:pt-32">
          {/* Первое состояние — главный заголовок */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Коллекция 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeOut, delay: 0.35 }}
              className="font-heading text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]"
            >
              Автомобиль,
              <br />
              <span className="italic text-white/70">подобранный для вас</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/catalog"
                className="group inline-flex h-12 items-center justify-center gap-1 rounded-full bg-white px-7 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
              >
                Смотреть каталог
                <ArrowUpRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="#contact"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-12 rounded-full border-white/30 bg-transparent px-7 text-white hover:bg-white hover:text-zinc-900",
                )}
              >
                <Phone className="mr-2 h-4 w-4" />
                Заказать звонок
              </Link>
            </motion.div>
          </motion.div>

          {/* Второе состояние — большой блок про честную цену */}
          <motion.div
            style={{ opacity: subtitleOpacity, y: subtitleY }}
            className="pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 lg:inset-x-10"
          >
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                Наш принцип
              </p>
              <p className="font-heading text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
                Сумма в карточке —{" "}
                <span className="italic text-white/70">
                  сумма в кассе
                </span>
              </p>
              <p className="mx-auto mt-8 max-w-xl text-base text-white/70 md:text-lg">
                Никаких «уточняйте по телефону». Все опции, КАСКО, кредит и
                допы — в калькуляторе с точностью до рубля.
              </p>
            </div>
          </motion.div>

          {/* Третье состояние — статистика */}
          <motion.div
            style={{ opacity: statsOpacity, y: statsY }}
            className="grid grid-cols-2 gap-8 border-t border-white/15 pt-10 text-sm md:grid-cols-4"
          >
            <div>
              <div className="font-heading text-3xl font-medium">
                <Counter value={12} />+
              </div>
              <div className="mt-1 text-white/60">лет на рынке</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-medium">
                <Counter value={50} />
              </div>
              <div className="mt-1 text-white/60">моделей в наличии</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-medium">
                <Counter value={24700} />
              </div>
              <div className="mt-1 text-white/60">довольных клиентов</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-medium">
                <Counter value={15} /> мин
              </div>
              <div className="mt-1 text-white/60">до перезвона менеджера</div>
            </div>
          </motion.div>
        </div>

        {/* Подсказка-стрелка при первом просмотре */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute inset-x-0 bottom-8 flex justify-center text-white/50"
        >
          <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
            <span>Скролл</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-px bg-white/40"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
