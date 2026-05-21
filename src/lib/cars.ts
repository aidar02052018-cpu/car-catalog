export type BodyType = "sedan" | "suv" | "crossover" | "electric" | "coupe" | "hatchback";
export type Fuel = "gasoline" | "diesel" | "electric" | "hybrid";
export type Transmission = "auto" | "manual";

export type Car = {
  id: string;
  name: string;
  brand: string;
  body: BodyType;
  fuel: Fuel;
  transmission: Transmission;
  price: number;
  year: number;
  image: string;
  engine: string;
  power: number;
  acceleration: number;
  topSpeed: number;
  consumption: string;
  description: string;
  features: string[];
};

export const BODY_LABELS: Record<BodyType, string> = {
  sedan: "Седан",
  suv: "Внедорожник",
  crossover: "Кроссовер",
  electric: "Электро",
  coupe: "Купе",
  hatchback: "Хэтчбек",
};

export const FUEL_LABELS: Record<Fuel, string> = {
  gasoline: "Бензин",
  diesel: "Дизель",
  electric: "Электро",
  hybrid: "Гибрид",
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  auto: "Автомат",
  manual: "Механика",
};

const DEFAULT_FEATURES = [
  "Кожаный салон",
  "Двухзонный климат-контроль",
  "Подогрев передних сидений",
  "Камера 360°",
  "Адаптивный круиз-контроль",
  "Беспроводная зарядка",
  "Премиальная аудиосистема",
  "LED-оптика",
];

export const cars: Car[] = [
  {
    id: "voyager-x",
    name: "Voyager X",
    brand: "Voyager",
    body: "crossover",
    fuel: "gasoline",
    transmission: "auto",
    price: 3290000,
    year: 2026,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80",
    engine: "2.0 TSI",
    power: 245,
    acceleration: 7.4,
    topSpeed: 230,
    consumption: "8.2 л/100 км",
    description:
      "Современный кроссовер с продуманной эргономикой и просторным салоном. Идеален для города и загородных поездок.",
    features: DEFAULT_FEATURES,
  },
  {
    id: "aurora-gt",
    name: "Aurora GT",
    brand: "Aurora",
    body: "sedan",
    fuel: "gasoline",
    transmission: "auto",
    price: 2490000,
    year: 2026,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80",
    engine: "1.8 TFSI",
    power: 190,
    acceleration: 8.1,
    topSpeed: 220,
    consumption: "7.4 л/100 км",
    description:
      "Сбалансированный седан бизнес-класса: спокойный дизайн, тихая езда и низкий расход. Лучший выбор для ежедневной эксплуатации.",
    features: DEFAULT_FEATURES,
  },
  {
    id: "pulse-ev",
    name: "Pulse EV",
    brand: "Pulse",
    body: "electric",
    fuel: "electric",
    transmission: "auto",
    price: 4150000,
    year: 2026,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=80",
    engine: "Электромотор 150 кВт",
    power: 340,
    acceleration: 5.2,
    topSpeed: 200,
    consumption: "17.3 кВт·ч/100 км",
    description:
      "Электрический кроссовер с запасом хода 480 км. Мгновенный разгон, тихая работа, нулевой выброс CO₂.",
    features: [
      "Запас хода 480 км",
      "Быстрая зарядка до 80% за 30 мин",
      "Тепловой насос",
      "Панорамная крыша",
      "Адаптивный круиз-контроль",
      "Камера 360°",
      "Премиальная аудиосистема",
      "Беспроводная зарядка",
    ],
  },
  {
    id: "terra-pro",
    name: "Terra Pro",
    brand: "Terra",
    body: "suv",
    fuel: "diesel",
    transmission: "auto",
    price: 3890000,
    year: 2026,
    image: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1600&q=80",
    engine: "3.0 TDI",
    power: 286,
    acceleration: 6.9,
    topSpeed: 235,
    consumption: "7.8 л/100 км",
    description:
      "Полноразмерный внедорожник с проверенной полноприводной трансмиссией. Готов и к серьёзному офф-роуду, и к комфортному путешествию.",
    features: [
      "Полный привод",
      "Понижающий ряд",
      "Блокировки дифференциалов",
      "Адаптивная пневмоподвеска",
      "Кожаный салон",
      "Камера 360°",
      "Премиальная аудиосистема",
      "Адаптивный круиз-контроль",
    ],
  },
  {
    id: "aurora-coupe",
    name: "Aurora Coupe",
    brand: "Aurora",
    body: "coupe",
    fuel: "gasoline",
    transmission: "auto",
    price: 4790000,
    year: 2026,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    engine: "3.0 V6 TFSI",
    power: 354,
    acceleration: 4.9,
    topSpeed: 280,
    consumption: "9.6 л/100 км",
    description:
      "Двухдверное купе с агрессивным силуэтом и спортивной подвеской. Заточено под удовольствие от вождения.",
    features: [
      "Спортивная подвеска",
      "Карбоновые элементы салона",
      "Спортивные сиденья с поддержкой",
      "Адаптивный круиз-контроль",
      "Премиальная аудиосистема",
      "Кожаный салон",
      "LED-оптика",
      "Беспроводная зарядка",
    ],
  },
  {
    id: "voyager-city",
    name: "Voyager City",
    brand: "Voyager",
    body: "hatchback",
    fuel: "hybrid",
    transmission: "auto",
    price: 1890000,
    year: 2025,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80",
    engine: "1.6 Hybrid",
    power: 140,
    acceleration: 9.8,
    topSpeed: 190,
    consumption: "4.5 л/100 км",
    description:
      "Городской хэтчбек с гибридной установкой. Минимальный расход топлива в пробках и компактные размеры для парковки.",
    features: [
      "Гибридная установка",
      "Рекуперация энергии",
      "Подогрев передних сидений",
      "Климат-контроль",
      "Камера заднего вида",
      "LED-оптика",
      "Беспроводная зарядка",
      "Apple CarPlay / Android Auto",
    ],
  },
  {
    id: "pulse-s",
    name: "Pulse S",
    brand: "Pulse",
    body: "sedan",
    fuel: "electric",
    transmission: "auto",
    price: 5290000,
    year: 2026,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=80",
    engine: "Двухмоторный 220 кВт",
    power: 495,
    acceleration: 3.4,
    topSpeed: 250,
    consumption: "18.6 кВт·ч/100 км",
    description:
      "Флагманский электроседан. Запас хода 520 км, разгон на уровне суперкаров и салон премиум-класса с минималистичным дизайном.",
    features: [
      "Запас хода 520 км",
      "Полный привод",
      "Быстрая зарядка до 80% за 25 мин",
      "Панорамная крыша",
      "Премиальная аудиосистема 16 динамиков",
      "Массаж передних сидений",
      "Подвеска с активным шасси",
      "Камера 360°",
    ],
  },
  {
    id: "terra-classic",
    name: "Terra Classic",
    brand: "Terra",
    body: "suv",
    fuel: "gasoline",
    transmission: "manual",
    price: 2790000,
    year: 2024,
    image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&w=1600&q=80",
    engine: "2.5 V6",
    power: 197,
    acceleration: 10.2,
    topSpeed: 195,
    consumption: "10.4 л/100 км",
    description:
      "Классический полноприводный внедорожник с рамной конструкцией. Простой, надёжный и ремонтопригодный.",
    features: [
      "Рамная конструкция",
      "Постоянный полный привод",
      "Понижающий ряд",
      "Тяговое усилие до 3500 кг",
      "Климат-контроль",
      "Подогрев сидений",
      "LED-оптика",
      "Камера заднего вида",
    ],
  },
  {
    id: "aurora-sport",
    name: "Aurora Sport",
    brand: "Aurora",
    body: "coupe",
    fuel: "gasoline",
    transmission: "manual",
    price: 5990000,
    year: 2026,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
    engine: "4.0 V8 Twin-Turbo",
    power: 510,
    acceleration: 3.8,
    topSpeed: 305,
    consumption: "11.8 л/100 км",
    description:
      "Спорткар с открытой архитектурой. Восьмицилиндровый битурбо, механическая коробка и звук, который слышно за километр.",
    features: [
      "Карбоновые элементы кузова",
      "Спортивные тормоза с увеличенными дисками",
      "Активное аэродинамическое крыло",
      "Адаптивная подвеска",
      "Спортивные сиденья Recaro",
      "Премиальная аудиосистема",
      "Карбон-керамические тормоза опционально",
      "Launch Control",
    ],
  },
  {
    id: "voyager-x-hybrid",
    name: "Voyager X Hybrid",
    brand: "Voyager",
    body: "crossover",
    fuel: "hybrid",
    transmission: "auto",
    price: 3590000,
    year: 2026,
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80",
    engine: "2.0 Hybrid",
    power: 252,
    acceleration: 7.8,
    topSpeed: 220,
    consumption: "5.2 л/100 км",
    description:
      "Гибридная версия флагманского кроссовера. Тот же простор и комфорт, но с расходом городского хэтчбека.",
    features: [
      "Гибридная установка",
      "Электрический пробег до 70 км",
      "Рекуперация энергии",
      "Климат-контроль",
      "Подогрев сидений и руля",
      "Камера 360°",
      "Премиальная аудиосистема",
      "Адаптивный круиз-контроль",
    ],
  },
  {
    id: "pulse-compact",
    name: "Pulse Compact",
    brand: "Pulse",
    body: "electric",
    fuel: "electric",
    transmission: "auto",
    price: 2990000,
    year: 2025,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=80",
    engine: "Электромотор 110 кВт",
    power: 204,
    acceleration: 7.1,
    topSpeed: 170,
    consumption: "15.8 кВт·ч/100 км",
    description:
      "Компактный электромобиль для города. Запас хода 320 км, маневренность и низкие расходы на эксплуатацию.",
    features: [
      "Запас хода 320 км",
      "Быстрая зарядка",
      "Тепловой насос",
      "Подогрев сидений",
      "Климат-контроль",
      "Камера заднего вида",
      "LED-оптика",
      "Apple CarPlay / Android Auto",
    ],
  },
  {
    id: "terra-grand",
    name: "Terra Grand",
    brand: "Terra",
    body: "suv",
    fuel: "diesel",
    transmission: "auto",
    price: 5490000,
    year: 2026,
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1600&q=80",
    engine: "4.0 TDI",
    power: 350,
    acceleration: 6.3,
    topSpeed: 245,
    consumption: "8.9 л/100 км",
    description:
      "Флагманский внедорожник: семиместный салон, пневмоподвеска и V8 дизель. Сочетание комфорта премиум-седана и проходимости.",
    features: [
      "Семиместный салон",
      "Пневмоподвеска",
      "Полный привод с блокировками",
      "Массаж передних сидений",
      "Премиальная аудиосистема Bang & Olufsen",
      "Панорамная крыша",
      "Адаптивный круиз с автопилотом",
      "Камера 360°",
    ],
  },
];

export const ALL_BRANDS = Array.from(new Set(cars.map((c) => c.brand))).sort();
export const ALL_BODIES = Array.from(new Set(cars.map((c) => c.body)));
export const ALL_FUELS = Array.from(new Set(cars.map((c) => c.fuel)));

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU").format(price) + " ₽";

export const getCar = (id: string) => cars.find((c) => c.id === id);

export const getSimilarCars = (car: Car, limit = 3) =>
  cars.filter((c) => c.id !== car.id && c.body === car.body).slice(0, limit);
