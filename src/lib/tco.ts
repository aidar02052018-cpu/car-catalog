import type { Car } from "./cars";

export type TCOInputs = {
  years: 3 | 5;
  kmPerYear: number;
  withKasko: boolean;
};

export type TCOLine = {
  label: string;
  perYear: number;
  total: number;
};

export type TCOResult = {
  lines: TCOLine[];
  acquisition: number;
  totalCost: number;
  residualValue: number;
  netCost: number;
  costPerMonth: number;
  costPerKm: number;
};

// Средние цены РФ 2026 (приближённые)
const FUEL_PRICE: Record<Car["fuel"], number> = {
  gasoline: 65,
  diesel: 70,
  hybrid: 65,
  electric: 15, // ₽/кВт·ч, усреднено между домом и быстрой зарядкой
};

function parseConsumption(s: string): number {
  const match = s.match(/([\d.,]+)/);
  return match ? parseFloat(match[1].replace(",", ".")) : 0;
}

function annualFuel(car: Car, kmPerYear: number): number {
  const usage = parseConsumption(car.consumption); // л/100 или кВт·ч/100
  return Math.round(((kmPerYear * usage) / 100) * FUEL_PRICE[car.fuel]);
}

// Транспортный налог по ставкам Москвы 2026
function annualTax(car: Car): number {
  if (car.fuel === "electric") return 0; // льгота для EV в Москве
  const p = car.power;
  let rate = 12;
  if (p > 100) rate = 25;
  if (p > 125) rate = 35;
  if (p > 150) rate = 45;
  if (p > 175) rate = 50;
  if (p > 200) rate = 65;
  if (p > 225) rate = 75;
  if (p > 250) rate = 150;
  return p * rate;
}

// Примерное ОСАГО для опытного водителя 30+ лет
function annualOsago(car: Car): number {
  return Math.round(5000 + car.power * 30);
}

// Плановое ТО у официального дилера
function annualMaintenance(car: Car): number {
  // ~0.6% от стоимости машины в год — усреднённая стоимость регламента
  return Math.round(car.price * 0.006);
}

// КАСКО: первый год дороже, потом снижается. Среднее по периоду ~4.5%
export function annualKasko(car: Car): number {
  return Math.round(car.price * 0.045);
}

// Остаточная стоимость на рынке
function residualRate(years: 3 | 5): number {
  return years === 3 ? 0.6 : 0.45;
}

export function calculateTCO(car: Car, inputs: TCOInputs): TCOResult {
  const { years, kmPerYear, withKasko } = inputs;

  const fuel = annualFuel(car, kmPerYear);
  const tax = annualTax(car);
  const osago = annualOsago(car);
  const maintenance = annualMaintenance(car);
  const kasko = withKasko ? annualKasko(car) : 0;

  const lines: TCOLine[] = [
    { label: "Топливо", perYear: fuel, total: fuel * years },
    { label: "Транспортный налог", perYear: tax, total: tax * years },
    { label: "ОСАГО", perYear: osago, total: osago * years },
    { label: "Плановое ТО", perYear: maintenance, total: maintenance * years },
  ];
  if (withKasko) {
    lines.push({ label: "КАСКО", perYear: kasko, total: kasko * years });
  }

  const totalOperating = lines.reduce((sum, l) => sum + l.total, 0);
  const acquisition = car.price;
  const totalCost = acquisition + totalOperating;
  const residualValue = Math.round(car.price * residualRate(years));
  const netCost = totalCost - residualValue;
  const costPerMonth = Math.round(netCost / (years * 12));
  const costPerKm = Math.round(netCost / (kmPerYear * years));

  return {
    lines,
    acquisition,
    totalCost,
    residualValue,
    netCost,
    costPerMonth,
    costPerKm,
  };
}
