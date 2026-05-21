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

  // Параллакс: фон медленно уезжает вверх, контент — ещё медленнее
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.95]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden bg-zinc-950 text-white"
    >
      <motion.div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2021_BMW_M4_Competition_Automatic_3.0_Front.jpg/1280px-2021_BMW_M4_Competition_Automatic_3.0_Front.jpg')",
          y: bgY,
          scale: bgScale,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/85 via-black/60 to-black/30" />
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/30 to-transparent"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        style={{ y: contentY }}
        className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-28"
      >
        <div className="max-w-3xl">
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.6 }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-white/70"
          >
            Прозрачные цены, тест-драйв за день и сервис, в который возвращаются.
            Никаких «уточняйте по телефону».
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.8 }}
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 1 }}
          className="mt-20 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 text-sm md:grid-cols-4"
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
      </motion.div>
    </section>
  );
}
