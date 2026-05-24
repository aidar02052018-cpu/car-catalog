"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, MessageCircle, X } from "lucide-react";

import { useCompare } from "@/lib/use-compare";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "bot"; text: string };

const INITIAL_MESSAGES: Message[] = [
  {
    role: "bot",
    text: "Здравствуйте! Я Анна из Прайм·Прайс 👋 Чем могу помочь? Можете спросить про цену, тест-драйв, кредит, гарантию.",
  },
];

// Простой keyword-based отвечатель. В реальном продукте — интеграция с ChatGPT/Yandex GPT или живой оператор.
function botReply(userText: string): string {
  const t = userText.toLowerCase();
  if (/прив|здра|добр|hi|hello/.test(t)) {
    return "Здравствуйте! Расскажите, какую модель рассматриваете — постараюсь помочь подобрать комплектацию или ответить на вопросы.";
  }
  if (/цен|стои|сколько|почём/.test(t)) {
    return "Все цены в карточках машин — финальные, с базовой комплектацией. На странице любой машины откройте калькулятор и соберите свою конфигурацию — увидите итог сразу.";
  }
  if (/тест|драйв|test/.test(t)) {
    return "Тест-драйв записывается прямо с карточки машины — кнопка «Записаться на тест-драйв». Введите имя и телефон, менеджер перезвонит в течение 15 минут.";
  }
  if (/кредит|рассроч|ипотек|лизинг|оплат/.test(t)) {
    return "Кредит со ставкой 12% годовых, сроки 12/24/36/48/60 месяцев. Расчёт онлайн в калькуляторе — переключите способ оплаты на «В кредит» и увидите ежемесячный платёж.";
  }
  if (/гарант|сервис|поломк|ремонт/.test(t)) {
    return "Расширенная заводская гарантия 5 лет на все автомобили. Свой сервисный центр — обслуживание у нас сохраняет гарантию.";
  }
  if (/адрес|где|карт|приехать|офис|салон/.test(t)) {
    return "Москва, ул. Примерная, 1. Работаем ежедневно 9:00–21:00. Тест-драйв можно записать онлайн.";
  }
  if (/каско|осаго|страх/.test(t)) {
    return "КАСКО на год — отдельной строкой в калькуляторе, около 95 000 ₽ для большинства моделей. ОСАГО оформляется отдельно при покупке.";
  }
  if (/подержан|пробег|вторич|б\/у/.test(t)) {
    return "Сейчас в каталоге только новые автомобили 2025–2026 годов выпуска. Раздел б/у в разработке.";
  }
  if (/трейд|обмен/.test(t)) {
    return "Трейд-ин принимаем — оценка вашей машины за 30 минут, сумма идёт в зачёт новой. Подробности уточнит менеджер.";
  }
  if (/электр|ev|tesla|гибрид/.test(t)) {
    return "В каталоге есть Tesla Model Y/3, BMW iX3, Audi Q4 e-tron, Volvo EX30, Polestar 2 — и гибриды Toyota RAV4, Honda Accord, Volvo XC60.";
  }
  return "Принял ваш вопрос — передал менеджеру. Перезвонит в течение 15 минут. Если срочно — звоните +7 (495) 123-45-67.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { count: compareCount } = useCompare();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);

    const delay = 700 + Math.random() * 600;
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: botReply(text) }]);
      setTyping(false);
    }, delay);
  };

  // Если открыта плашка сравнения снизу — поднимаем чат-кнопку повыше
  const bottomOffset = compareCount > 0 ? "bottom-24 lg:bottom-28" : "bottom-6";

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-2xl transition-all hover:scale-110 hover:bg-zinc-800",
          bottomOffset,
        )}
        aria-label="Открыть чат"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed right-6 z-40 flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl",
              "h-[min(560px,calc(100vh-3rem))]",
              compareCount > 0 ? "bottom-24 lg:bottom-28" : "bottom-6",
            )}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-950 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 font-medium">
                  А
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-950 bg-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Анна</p>
                  <p className="text-xs text-white/60">Онлайн · отвечает за минуту</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-stone-50 p-4"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-zinc-900 text-white"
                        : "bg-white text-zinc-800 shadow-sm",
                    )}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-1.5 rounded-2xl bg-white px-4 py-3 shadow-sm">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay,
                          ease: "easeInOut",
                        }}
                        className="block h-1.5 w-1.5 rounded-full bg-zinc-400"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="border-t border-zinc-100 bg-white p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Ваш вопрос…"
                  rows={1}
                  className="max-h-32 flex-1 resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Отправить"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white transition disabled:opacity-40 hover:enabled:bg-zinc-700"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
