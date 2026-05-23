"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { Car, Menu, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";
import { cn } from "@/lib/utils";

type Variant = "transparent" | "solid";

const NAV_LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "/#advantages", label: "Преимущества" },
  { href: "/#contact", label: "Контакты" },
];

export function SiteHeader({ variant = "solid" }: { variant?: Variant }) {
  const [open, setOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Плавная интерполяция: фон шапки и цвет текста меняются по мере прокрутки,
  // не бинарно. Триггер запускается между 350 и 600 пикселями скролла.
  const { scrollY } = useScroll();
  const bgAlpha = useTransform(scrollY, [350, 600], [0, 0.92]);
  const borderAlpha = useTransform(scrollY, [350, 600], [0, 0.12]);
  const backgroundColor = useMotionTemplate`rgba(255, 255, 255, ${bgAlpha})`;
  const borderColor = useMotionTemplate`rgba(0, 0, 0, ${borderAlpha})`;

  // Boolean — для смены цвета текста (rgb-интерполяция уродлива для текста)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolledPastHero(latest > 500);
  });

  const isTransparent = variant === "transparent";
  const effectiveTransparent = isTransparent && !scrolledPastHero;

  return (
    <>
      <motion.header
        style={
          isTransparent
            ? { backgroundColor, borderBottomColor: borderColor, borderBottomWidth: 1 }
            : undefined
        }
        className={cn(
          "inset-x-0 top-0 z-50",
          isTransparent ? "fixed backdrop-blur-md" : "sticky border-b border-zinc-200 bg-white/90 backdrop-blur",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-10">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 transition-colors duration-500",
              effectiveTransparent ? "text-white" : "text-zinc-900",
            )}
          >
            <Car className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-base font-medium tracking-[0.18em] lg:text-lg">
              ПРАЙМ · ПРАЙС
            </span>
          </Link>

          <nav
            className={cn(
              "hidden gap-10 font-medium transition-colors duration-500 md:flex",
              "text-[15px]",
              effectiveTransparent ? "text-white/85" : "text-zinc-600",
            )}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors",
                  effectiveTransparent ? "hover:text-white" : "hover:text-zinc-900",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "hidden h-9 rounded-full px-4 transition-colors duration-500 lg:inline-flex",
                effectiveTransparent &&
                  "border-white/30 bg-transparent text-white hover:bg-white hover:text-zinc-900",
              )}
            >
              Записаться
            </Link>

            <div className="hidden md:block">
              <UserMenu variant={effectiveTransparent ? "transparent" : "solid"} />
            </div>

            <button
              type="button"
              aria-label="Открыть меню"
              onClick={() => setOpen(true)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 md:hidden",
                effectiveTransparent
                  ? "border-white/30 text-white"
                  : "border-zinc-200 text-zinc-900",
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-white p-6 md:hidden"
          >
            <div className="flex h-10 items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-900">
                <Car className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-sm font-medium tracking-[0.15em]">ПРАЙМ · ПРАЙС</span>
              </div>
              <button
                type="button"
                aria-label="Закрыть меню"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { delayChildren: 0.15, staggerChildren: 0.06 } },
              }}
              className="mt-12 flex flex-col gap-1"
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-heading text-3xl text-zinc-900 transition hover:text-zinc-500"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-auto"
            >
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 w-full rounded-full",
                )}
              >
                Записаться
              </Link>
              <p className="mt-4 text-center text-xs text-zinc-500">
                +7 (495) 123-45-67 · hello@primeprice.ru
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
