export type Option = {
  id: string;
  label: string;
  price: number;
  description?: string;
};

export type ColorOption = Option & { hex: string };

export const TRIMS: Option[] = [
  { id: "base", label: "Базовая", price: 0, description: "Стандартная комплектация" },
  { id: "comfort", label: "Комфорт", price: 250000, description: "Кожа, климат, навигация" },
  { id: "premium", label: "Премиум", price: 550000, description: "Полный пакет + ассистенты" },
];

export const COLORS: ColorOption[] = [
  { id: "black", label: "Чёрный", price: 0, hex: "#0a0a0a" },
  { id: "white", label: "Белый", price: 0, hex: "#f5f5f5" },
  { id: "silver", label: "Серебристый", price: 0, hex: "#c0c0c0" },
  { id: "graphite", label: "Графит", price: 30000, hex: "#3a3a3a" },
  { id: "blue", label: "Синий металлик", price: 50000, hex: "#1e3a8a" },
  { id: "red", label: "Красный перламутр", price: 70000, hex: "#991b1b" },
];

export const WHEELS: Option[] = [
  { id: "r18", label: "R18 базовые", price: 0 },
  { id: "r19", label: "R19 спортивные", price: 90000 },
  { id: "r20", label: "R20 премиум", price: 180000 },
];

export const INTERIORS: Option[] = [
  { id: "fabric", label: "Ткань", price: 0 },
  { id: "leather", label: "Кожа", price: 180000 },
  { id: "alcantara", label: "Алькантара", price: 240000 },
];

export const EXTRAS: Option[] = [
  { id: "kasko", label: "КАСКО на год", price: 95000 },
  { id: "winter", label: "Зимняя резина в сборе", price: 85000 },
  { id: "tint", label: "Тонировка задних стёкол", price: 12000 },
  { id: "shield", label: "Защита картера", price: 18000 },
  { id: "dvr", label: "Видеорегистратор с установкой", price: 24000 },
  { id: "alarm", label: "Сигнализация с автозапуском", price: 35000 },
  { id: "mats", label: "Резиновые коврики", price: 8000 },
];

export const CREDIT_TERMS = [12, 24, 36, 48, 60] as const;
export type CreditTerm = (typeof CREDIT_TERMS)[number];

export const CREDIT_RATE = 0.12;

export function monthlyPayment(loan: number, months: number, annualRate = CREDIT_RATE): number {
  if (loan <= 0) return 0;
  const r = annualRate / 12;
  if (r === 0) return loan / months;
  const factor = Math.pow(1 + r, months);
  return (loan * r * factor) / (factor - 1);
}
