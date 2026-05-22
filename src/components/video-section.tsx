import Link from "next/link";
import { Play } from "lucide-react";

import { Reveal } from "@/components/motion-primitives";
import type { Car } from "@/lib/cars";

export function VideoSection({ car }: { car: Car }) {
  const query = encodeURIComponent(
    `${car.brand} ${car.name} обзор тест-драйв`,
  );
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${query}`;

  return (
    <section className="border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
            Видеообзор
          </p>
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-5xl">
            Посмотрите на {car.name}{" "}
            <span className="italic text-white/60">в движении</span>
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Подборка тест-драйвов и обзоров от автомобильных журналистов.
            Откроется на YouTube в новой вкладке.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <Link
            href={youtubeSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Смотреть видеообзоры ${car.brand} ${car.name} на YouTube`}
            className="group relative block aspect-video w-full overflow-hidden rounded-3xl bg-zinc-900"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.03]"
              style={{ backgroundImage: `url('${car.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl transition group-hover:scale-110 md:h-24 md:w-24">
                <Play className="ml-1 h-8 w-8 fill-zinc-900 text-zinc-900 md:h-10 md:w-10" />
              </div>
            </div>

            <div className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">
                YouTube
              </p>
              <p className="mt-2 font-heading text-2xl font-medium md:text-3xl">
                {car.brand} {car.name} — обзоры экспертов
              </p>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
