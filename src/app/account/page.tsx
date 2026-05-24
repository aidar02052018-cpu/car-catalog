"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Mail } from "lucide-react";

import { Reveal } from "@/components/motion-primitives";
import { SiteHeader } from "@/components/site-header";
import { formatPrice } from "@/lib/cars";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/use-auth";

type Lead = {
  id: string;
  created_at: string;
  kind: "contact" | "test_drive" | "purchase";
  car_id: string | null;
  car_name: string | null;
  total_price: number | null;
};

const KIND_LABEL: Record<Lead["kind"], string> = {
  contact: "Контактная заявка",
  test_drive: "Тест-драйв",
  purchase: "Заявка на покупку",
};

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    setLeadsLoading(true);
    supabase
      .from("leads")
      .select("id, created_at, kind, car_id, car_name, total_price")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setLeads((data as Lead[]) ?? []);
        setLeadsLoading(false);
      });
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
          <p className="text-zinc-500">Загрузка…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <SiteHeader />

      <section className="border-b border-zinc-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <Reveal>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Личный кабинет
            </p>
            <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
              {user.email?.split("@")[0]}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-600">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </span>
              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
                className="inline-flex items-center gap-1.5 text-zinc-500 transition hover:text-zinc-900"
              >
                <LogOut className="h-3.5 w-3.5" />
                Выйти
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              История
            </p>
            <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
              Мои заявки
            </h2>
          </div>
          <p className="text-sm text-zinc-500">
            {leads.length}{" "}
            {leads.length === 1
              ? "заявка"
              : leads.length < 5
                ? "заявки"
                : "заявок"}
          </p>
        </div>

        {leadsLoading ? (
          <p className="text-zinc-500">Загружаем…</p>
        ) : leads.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-12 text-center">
            <p className="font-heading text-2xl">Заявок пока нет</p>
            <p className="mt-2 text-zinc-600">
              История заявок появится после первой отправки формы с этого аккаунта.
            </p>
            <p className="mt-4 text-xs text-zinc-500">
              Сохранённые машины — на отдельной странице{" "}
              <Link href="/favorites" className="underline">
                «Избранное»
              </Link>
              , она работает и без логина.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
            <table className="w-full">
              <thead className="border-b border-zinc-200 bg-zinc-50">
                <tr className="text-left text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                  <th className="px-6 py-4">Дата</th>
                  <th className="px-6 py-4">Тип</th>
                  <th className="px-6 py-4">Машина</th>
                  <th className="px-6 py-4 text-right">Цена</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-zinc-100 text-sm">
                    <td className="px-6 py-4 text-zinc-600">
                      {new Date(lead.created_at).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">{KIND_LABEL[lead.kind]}</td>
                    <td className="px-6 py-4">
                      {lead.car_id ? (
                        <Link
                          href={`/catalog/${lead.car_id}`}
                          className="font-medium text-zinc-900 hover:underline"
                        >
                          {lead.car_name}
                        </Link>
                      ) : (
                        <span className="text-zinc-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {lead.total_price ? formatPrice(lead.total_price) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
