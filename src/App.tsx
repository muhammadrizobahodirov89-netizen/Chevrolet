import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronRight,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  1. CHEVROLET MA'LUMOTLARI VA TURLARI (HAMMA KOD BITTA FAYLDA)             */
/* -------------------------------------------------------------------------- */

type BodyStyle = 'all' | 'sedan' | 'crossover' | 'suv' | 'sport';

interface TrimOption {
  id: string;
  name: string;
  engine: string;
  powerHp: number;
  acceleration: string;
  priceDelta: number;
  highlights: string[];
}

interface PaintOption {
  id: string;
  name: string;
  hex: string;
  priceDelta: number;
}

interface AddonPackage {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ChevyModel {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: Exclude<BodyStyle, 'all'>;
  categoryLabel: string;
  basePrice: number;
  image: string;
  drivetrain: string;
  transmission: string;
  fuelOrRange: string;
  warranty: string;
  trims: TrimOption[];
  specsSummary: {
    length: string;
    trunk: string;
    safety: string;
    wheelbase: string;
  };
}

interface TestDriveBooking {
  id: string;
  modelName: string;
  dealership: string;
  date: string;
  customerName: string;
  phone: string;
  createdAt: string;
}

const IMAGES = {
  hero: '/src/assets/images/chevy_hero_showroom_v2_1795272861020.jpg',
  cobalt: '/src/assets/images/chevy_cobalt_ltz_1795273172682.jpg',
  onix: '/src/assets/images/chevy_sedan_onix_v2_1795272843551.jpg',
  monza: '/src/assets/images/chevy_monza_rs_1795273171651.jpg',
  malibu: '/src/assets/images/chevy_malibu_xl_1795273172196.jpg',
  tracker: '/src/assets/images/chevy_crossover_tracker_v2_1795272841820.jpg',
  captiva: '/src/assets/images/chevy_captiva_suv_1795273172749.jpg',
  equinox: '/src/assets/images/chevy_ev_blazer_v2_1795272860972.jpg',
  tahoe: '/src/assets/images/chevy_suv_tahoe_v2_1795272860082.jpg',
  corvette: '/src/assets/images/chevy_corvette_c8_1795273172918.jpg',
};

const PAINT_OPTIONS: PaintOption[] = [
  { id: 'obsidian', name: 'Obsidian Qora Metallik', hex: '#141417', priceDelta: 0 },
  { id: 'pearl', name: 'Summit Pearl Oq', hex: '#F1F5F9', priceDelta: 4500000 },
  { id: 'titanium', name: 'Sterling Titanium Kulrang', hex: '#71717A', priceDelta: 4500000 },
  { id: 'cobalt', name: 'Riptide Cobalt Ko‘k', hex: '#1D4ED8', priceDelta: 6000000 },
  { id: 'crimson', name: 'Radiant Qizil Metallik', hex: '#B91C1C', priceDelta: 7500000 },
  { id: 'gold', name: 'Champagne Oltin', hex: '#C59B27', priceDelta: 8500000 },
];

const ADDON_PACKAGES: AddonPackage[] = [
  {
    id: 'panoramic',
    name: 'Panoramali shisha tom',
    description: 'Ikki seksiyali elektr lyuk va quyoshdan himoya pardasi',
    price: 14500000,
  },
  {
    id: 'bose',
    name: 'Bose Studio Audio tizimi',
    description: '10 dinamikli raqamli akustika va faol shovqin pasaytirgich',
    price: 11200000,
  },
  {
    id: 'safety360',
    name: 'Chevy Safety Assist 360°',
    description: 'To‘liq aylana HD kamera, ko‘r hudud nazorati va adaptiv kruiz',
    price: 9800000,
  },
];

const CHEVY_MODELS: ChevyModel[] = [
  {
    id: 'cobalt',
    number: '01',
    name: 'Chevrolet Cobalt Midnight',
    tagline: 'Ishonchli oilaviy sedan, keng salon va chidamli yurish qismi',
    category: 'sedan',
    categoryLabel: 'Sedan',
    basePrice: 146500000,
    image: IMAGES.cobalt,
    drivetrain: 'Old g‘ildirak (FWD)',
    transmission: '6 pog‘onali avtomat',
    fuelOrRange: '6.5 L / 100 km',
    warranty: '5 yil / 150 000 km',
    trims: [
      {
        id: 'cobalt-lt',
        name: 'Style AT',
        engine: '1.5L DOHC Benzin',
        powerHp: 106,
        acceleration: '11.7 soniya',
        priceDelta: 0,
        highlights: ['ABS xavfsizlik tizimi', '545 litr ulkan yukxona', 'Qora Midnight disklari'],
      },
      {
        id: 'cobalt-midnight',
        name: 'Midnight Edition',
        engine: '1.5L DOHC Benzin',
        powerHp: 106,
        acceleration: '11.5 soniya',
        priceDelta: 12500000,
        highlights: ['Qoraytirilgan sport optikasi', 'Isitiladigan old o‘rindiqlar', 'Tashqi qora kuzov detallari'],
      },
    ],
    specsSummary: {
      length: '4 479 mm',
      trunk: '545 litr',
      safety: 'ABS + 2 ta xavfsizlik yostig‘i',
      wheelbase: '2 620 mm',
    },
  },
  {
    id: 'onix',
    number: '02',
    name: 'Chevrolet Onix Turbo',
    tagline: 'Shahar dinamikasi va tejamkor Ecotec turbo muhandisligi',
    category: 'sedan',
    categoryLabel: 'Sedan',
    basePrice: 176900000,
    image: IMAGES.onix,
    drivetrain: 'Old g‘ildirak (FWD)',
    transmission: '6 pog‘onali avtomat',
    fuelOrRange: '5.8 L / 100 km',
    warranty: '5 yil / 150 000 km',
    trims: [
      {
        id: 'onix-ls',
        name: '1LT Bazaviy',
        engine: '1.2L CSS Atmosfera',
        powerHp: 90,
        acceleration: '11.4 soniya',
        priceDelta: 0,
        highlights: ['8 dyuymli sensorli ekran', 'LED kunduzgi chiroqlar', '4 ta xavfsizlik yostig‘i'],
      },
      {
        id: 'onix-ltz',
        name: 'LTZ Turbo',
        engine: '1.2L Ecotec Turbo',
        powerHp: 132,
        acceleration: '9.6 soniya',
        priceDelta: 22000000,
        highlights: ['Simsiz zaryadlash', 'Orqa ko‘rish kamerasi', 'Kruiz-nazorat va isitiladigan o‘rindiqlar'],
      },
      {
        id: 'onix-premier',
        name: 'Premier Redline',
        engine: '1.2L Ecotec Turbo',
        powerHp: 132,
        acceleration: '9.4 soniya',
        priceDelta: 38500000,
        highlights: ['Yarim-avtomatik avtoturargoh', 'Ikki rangli charm salon', '16" qora sport disklari'],
      },
    ],
    specsSummary: {
      length: '4 474 mm',
      trunk: '469 litr',
      safety: '6 ta xavfsizlik yostig‘i · ESC',
      wheelbase: '2 600 mm',
    },
  },
  {
    id: 'monza',
    number: '03',
    name: 'Chevrolet Monza RS',
    tagline: 'Sport ko‘rinishi, raqamli qo‘sh ekran va tezkor javob',
    category: 'sedan',
    categoryLabel: 'Sport Sedan',
    basePrice: 238000000,
    image: IMAGES.monza,
    drivetrain: 'Old g‘ildirak (FWD)',
    transmission: '6 pog‘onali DCT / AT',
    fuelOrRange: '5.9 L / 100 km',
    warranty: '5 yil / 150 000 km',
    trims: [
      {
        id: 'monza-at',
        name: '1.5L Comfort',
        engine: '1.5L L2B Benzin',
        powerHp: 113,
        acceleration: '10.9 soniya',
        priceDelta: 0,
        highlights: ['10.25" qo‘sh raqamli panel', 'Elektr lyuk', 'Orqa kamera va parktronik'],
      },
      {
        id: 'monza-rs',
        name: 'RS 1.3T Mild-Hybrid',
        engine: '1.3L Turbo + 48V',
        powerHp: 163,
        acceleration: '8.8 soniya',
        priceDelta: 34000000,
        highlights: ['RS sport aerodinamik bamperlar', 'Qizil RS o‘rindiq bezaklari', '17" qora sport disklari'],
      },
    ],
    specsSummary: {
      length: '4 656 mm',
      trunk: '405 litr',
      safety: 'Ko‘r hudud nazorati · ESC',
      wheelbase: '2 640 mm',
    },
  },
  {
    id: 'malibu',
    number: '04',
    name: 'Chevrolet Malibu XL',
    tagline: 'Biznes toifadagi qulaylik va 2.0L Turbo quvvati',
    category: 'sedan',
    categoryLabel: 'Biznes Sedan',
    basePrice: 419000000,
    image: IMAGES.malibu,
    drivetrain: 'Old g‘ildirak (FWD)',
    transmission: '9 pog‘onali avtomat',
    fuelOrRange: '7.4 L / 100 km',
    warranty: '5 yil / 150 000 km',
    trims: [
      {
        id: 'malibu-lt',
        name: 'LT 1.5 Turbo',
        engine: '1.5L Turbo Ecotec',
        powerHp: 166,
        acceleration: '9.1 soniya',
        priceDelta: 0,
        highlights: ['Ikki zonali klimat-nazorat', 'Kalitsiz kirish va start', 'Orqa kamera'],
      },
      {
        id: 'malibu-xl',
        name: 'Premier 2.0 Turbo',
        engine: '2.0L Turbo 9AT',
        powerHp: 250,
        acceleration: '6.8 soniya',
        priceDelta: 56000000,
        highlights: ['Bose 9-dinamikli audio', 'Ventilyatsiyali charm o‘rindiqlar', 'Panoramali tom'],
      },
    ],
    specsSummary: {
      length: '4 933 mm',
      trunk: '520 litr',
      safety: '8 ta xavfsizlik yostig‘i · Radar',
      wheelbase: '2 829 mm',
    },
  },
  {
    id: 'tracker',
    number: '05',
    name: 'Chevrolet Tracker RS',
    tagline: 'Har qanday yo‘lga tayyor ixcham urban krossover',
    category: 'crossover',
    categoryLabel: 'Krossover',
    basePrice: 255400000,
    image: IMAGES.tracker,
    drivetrain: 'Old g‘ildirak (FWD)',
    transmission: '6 pog‘onali avtomat',
    fuelOrRange: '6.2 L / 100 km',
    warranty: '5 yil / 150 000 km',
    trims: [
      {
        id: 'tracker-ls',
        name: 'LT Turbo',
        engine: '1.2L Ecotec Turbo',
        powerHp: 132,
        acceleration: '9.8 soniya',
        priceDelta: 0,
        highlights: ['To‘liq LED optika', 'Apple CarPlay & Android Auto', 'Klimat-nazorat tizimi'],
      },
      {
        id: 'tracker-premier',
        name: 'Premier Plus',
        engine: '1.2L Ecotec Turbo',
        powerHp: 132,
        acceleration: '9.5 soniya',
        priceDelta: 28000000,
        highlights: ['Panoramali tom', 'Avtomatik tormozlash tizimi', '17" ikki tusli alyuminiy disklar'],
      },
      {
        id: 'tracker-rs',
        name: 'RS Sport Line',
        engine: '1.2L Turbo Tuned',
        powerHp: 140,
        acceleration: '9.1 soniya',
        priceDelta: 42000000,
        highlights: ['RS qora radiator panjarasi', 'Qizil chokli sport salon', '18" RS olmos kesimli disklar'],
      },
    ],
    specsSummary: {
      length: '4 270 mm',
      trunk: '390 / 1 334 litr',
      safety: 'To‘qnashuvni oldini olish radar tizimi',
      wheelbase: '2 570 mm',
    },
  },
  {
    id: 'captiva',
    number: '06',
    name: 'Chevrolet Captiva Premier',
    tagline: 'Katta oilalar uchun 7 o‘rinli keng va zamonaviy krossover',
    category: 'crossover',
    categoryLabel: '7-o‘rinli Krossover',
    basePrice: 319900000,
    image: IMAGES.captiva,
    drivetrain: 'Old g‘ildirak (FWD)',
    transmission: 'CVT variator (8 rejim)',
    fuelOrRange: '7.5 L / 100 km',
    warranty: '5 yil / 150 000 km',
    trims: [
      {
        id: 'captiva-lt',
        name: 'LT 5 o‘rinli',
        engine: '1.5L Turbo Benzin',
        powerHp: 147,
        acceleration: '9.9 soniya',
        priceDelta: 0,
        highlights: ['10.4" vertikal sensorli ekran', 'Panoramali shisha tom', 'Kruiz-nazorat'],
      },
      {
        id: 'captiva-premier',
        name: 'Premier 7 o‘rinli',
        engine: '1.5L Turbo Benzin',
        powerHp: 147,
        acceleration: '10.1 soniya',
        priceDelta: 29000000,
        highlights: ['360° aylana kamera', '7 o‘rinli transformatsiya saloni', 'Perforatsiyali charm o‘rindiqlar'],
      },
    ],
    specsSummary: {
      length: '4 715 mm',
      trunk: '535 / 1 051 litr',
      safety: '360° HD kamera · 6 ta yostiq',
      wheelbase: '2 750 mm',
    },
  },
  {
    id: 'equinox-ev',
    number: '07',
    name: 'Chevrolet Equinox EV',
    tagline: 'Ultium elektr platformasidagi kelajak avlod krossoveri',
    category: 'suv',
    categoryLabel: 'Elektr SUV',
    basePrice: 449000000,
    image: IMAGES.equinox,
    drivetrain: 'To‘liq tortish (eAWD)',
    transmission: 'Bir pog‘onali reduktor',
    fuelOrRange: '512 km (bir quvvatda)',
    warranty: '8 yil batareya kafolati',
    trims: [
      {
        id: 'eq-2lt',
        name: '2LT Elektr',
        engine: 'Ultium Single Motor',
        powerHp: 213,
        acceleration: '7.4 soniya',
        priceDelta: 0,
        highlights: ['17.7 dyuymli ulkan bosh ekran', 'Tez quvvatlash (150 kVt DC)', 'One-Pedal haydash rejimi'],
      },
      {
        id: 'eq-2rs',
        name: '2RS eAWD',
        engine: 'Ultium Dual Motor AWD',
        powerHp: 288,
        acceleration: '5.8 soniya',
        priceDelta: 55000000,
        highlights: ['To‘liq elektr tortish tizimi', 'Yashirin eshik tutqichlari', '20" aerodinamik qora disklar'],
      },
      {
        id: 'eq-3rs',
        name: '3RS Flagman',
        engine: 'Ultium Dual Motor AWD',
        powerHp: 288,
        acceleration: '5.6 soniya',
        priceDelta: 88000000,
        highlights: ['Super Cruise yarim-avtopilot', 'Old oynada proyeksiya (HUD)', '21" sport g‘ildirak to‘plami'],
      },
    ],
    specsSummary: {
      length: '4 840 mm',
      trunk: '748 / 1 620 litr',
      safety: 'Chevy Safety Assist + Super Cruise',
      wheelbase: '2 954 mm',
    },
  },
  {
    id: 'tahoe',
    number: '08',
    name: 'Chevrolet Tahoe High Country',
    tagline: 'V8 quvvati, pnevmatik osma va mutlaq maqom timsoli',
    category: 'suv',
    categoryLabel: 'Flagman SUV',
    basePrice: 1140000000,
    image: IMAGES.tahoe,
    drivetrain: 'To‘liq 4WD + Pnevmatik osma',
    transmission: '10 pog‘onali avtomat',
    fuelOrRange: '5.3L V8 · 355 ot kuchi',
    warranty: '5 yil / 150 000 km',
    trims: [
      {
        id: 'tahoe-rst',
        name: 'RST Performance',
        engine: '5.3L EcoTec3 V8',
        powerHp: 355,
        acceleration: '7.3 soniya',
        priceDelta: 0,
        highlights: ['Magnetic Ride Control osma', '7 o‘rinli keng charm salon', '22" qora RST disklari'],
      },
      {
        id: 'tahoe-hc',
        name: 'High Country Lux',
        engine: '6.2L EcoTec3 V8',
        powerHp: 420,
        acceleration: '6.2 soniya',
        priceDelta: 145000000,
        highlights: ['Oltin-bronza High Country panjara', 'Air Ride adaptiv pnevmo osma', 'Orqa yo‘lovchilar uchun ikkita 12.6" ekran'],
      },
    ],
    specsSummary: {
      length: '5 352 mm',
      trunk: '722 / 3 480 litr',
      safety: '13 xil kamera ko‘rinishi · 360° HD',
      wheelbase: '3 071 mm',
    },
  },
  {
    id: 'corvette',
    number: '09',
    name: 'Chevrolet Corvette Stingray',
    tagline: 'O‘rta dvigatelli afsonaviy superkar va trek muhandisligi',
    category: 'sport',
    categoryLabel: 'Sportkar',
    basePrice: 1480000000,
    image: IMAGES.corvette,
    drivetrain: 'Orqa g‘ildirak (RWD)',
    transmission: '8 pog‘onali Tremec DCT',
    fuelOrRange: '6.2L LT2 V8 · 495 ot kuchi',
    warranty: '5 yil / 100 000 km',
    trims: [
      {
        id: 'c8-2lt',
        name: 'Stingray 2LT Coupe',
        engine: '6.2L LT2 V8',
        powerHp: 495,
        acceleration: '2.9 soniya',
        priceDelta: 0,
        highlights: ['0–100 km/s tezlanish: 2.9 soniya', 'Bose Performance 14-dinamik', 'Yechiladigan Targa tom'],
      },
      {
        id: 'c8-z51',
        name: 'Z51 Performance 3LT',
        engine: '6.2L LT2 V8 Z51',
        powerHp: 495,
        acceleration: '2.8 soniya',
        priceDelta: 195000000,
        highlights: ['Brembo poyga tormoz tizimi', 'Nappa charm va karbon bezak', 'Magnetic Ride Control 4.0'],
      },
    ],
    specsSummary: {
      length: '4 630 mm',
      trunk: '357 litr (old + orqa)',
      safety: 'Poyga telemetriyasi · Brembo ABS',
      wheelbase: '2 722 mm',
    },
  },
];

const ENGINEERING_PILLARS = [
  {
    number: '01',
    title: 'Ecotec Turbo va Ultium Elektr Muhandisligi',
    description:
      'Yengil alyuminiy blokli turbo dvigatellar va yuqori zichlikdagi Ultium batareyalari yoqilg‘i sarfini pasaytirgan holda maksimal aylanish momentini ta’minlaydi.',
    metric: '15% kamroq sarf · 8 yillik batareya kafolati',
  },
  {
    number: '02',
    title: 'Chevy Safety Assist Faol Himoya Tizimi',
    description:
      'Old to‘qnashuvni aniqlovchi radar, piyodalarni sezuvchi avtomatik tormoz, yo‘l chizig‘ida ushlab turish va 360° HD kameralar har soniyada haydovchini himoya qiladi.',
    metric: '6 ta asosiy radar va kamera datchigi',
  },
  {
    number: '03',
    title: 'Raqamli Kokpit va Uzluksiz Aloqa',
    description:
      '17.7 dyuymli egri sensorli bosh ekranlar, simsiz CarPlay/Android Auto, ovozli boshqaruv hamda real vaqtda avtomobil holatini kuzatish imkoniyati.',
    metric: '0.2 soniyalik tezkor interfeys javobi',
  },
];

const DEALERSHIPS = [
  'Toshkent · Sergeli Flagman Avtosaloni',
  'Toshkent · Yunusobod Chevrolet Markazi',
  'Samarqand · Registon Rasmiy Diler',
  'Farg‘ona · Vodiy Motors Markazi',
  'Buxoro · Zarafshon Avtosaloni',
];

const STORAGE_BOOKINGS_KEY = 'chevrolet_uz_test_drives_v1';

/* -------------------------------------------------------------------------- */
/*  2. YORDAMCHI FUNKSIYALAR VA CHEVROLET BOWTIE BELGISI                       */
/* -------------------------------------------------------------------------- */

function formatSom(amount: number): string {
  return `${amount.toLocaleString('ru-RU')} so‘m`;
}

function ChevroletBowtie({ className = 'w-8 h-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M21.5 2H42.5L40.5 7H58.5L54.5 17H40.5L42.5 22H21.5L23.5 17H5.5L9.5 7H23.5L21.5 2Z"
        fill="#D4AF37"
        stroke="#FDE68A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 5H40.5L39 9.5H54.5L52 14.5H39L40.5 19H23.5L25 14.5H9.5L12 9.5H25L23.5 5Z"
        fill="#B8860B"
      />
    </svg>
  );
}

function SafeAutomotiveImage({
  src,
  alt,
  title,
  className = '',
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#121215] text-zinc-400 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ChevroletBowtie className="w-12 h-5 mb-3" />
        <p className="font-display font-medium text-sm text-zinc-200">{title}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  3. ASOSIY CHEVROLET FLAGMAN ILOVASI                                       */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [bodyFilter, setBodyFilter] = useState<BodyStyle>('all');
  const [detailModel, setDetailModel] = useState<ChevyModel | null>(null);

  // Interaktiv Konfigurator holati
  const [selectedModelId, setSelectedModelId] = useState<string>('tahoe');
  const [selectedTrimId, setSelectedTrimId] = useState<string>('tahoe-hc');
  const [selectedPaintId, setSelectedPaintId] = useState<string>('obsidian');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['safety360']);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [loanMonths, setLoanMonths] = useState<number>(36);
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [quoteCode, setQuoteCode] = useState<string>('');

  // Test-drayvga yozilish holati
  const [tdModelId, setTdModelId] = useState<string>('tracker');
  const [tdDealer, setTdDealer] = useState<string>(DEALERSHIPS[0]);
  const [tdDate, setTdDate] = useState<string>('2026-11-25');
  const [tdName, setTdName] = useState<string>('');
  const [tdPhone, setTdPhone] = useState<string>('+998 ');
  const [tdError, setTdError] = useState<string>('');
  const [tdSuccess, setTdSuccess] = useState<string>('');
  const [bookings, setBookings] = useState<TestDriveBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch {
      // ignore storage failure
    }
  }, [bookings]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDetailModel(null);
        setQuoteModalOpen(false);
      }
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  const filteredModels = useMemo(() => {
    if (bodyFilter === 'all') return CHEVY_MODELS;
    return CHEVY_MODELS.filter((m) => m.category === bodyFilter);
  }, [bodyFilter]);

  const activeConfigModel = useMemo(
    () => CHEVY_MODELS.find((m) => m.id === selectedModelId) || CHEVY_MODELS[0],
    [selectedModelId]
  );

  const activeTrim = useMemo(
    () =>
      activeConfigModel.trims.find((t) => t.id === selectedTrimId) ||
      activeConfigModel.trims[0],
    [activeConfigModel, selectedTrimId]
  );

  const activePaint = useMemo(
    () => PAINT_OPTIONS.find((p) => p.id === selectedPaintId) || PAINT_OPTIONS[0],
    [selectedPaintId]
  );

  const addonsTotal = useMemo(
    () =>
      ADDON_PACKAGES.filter((a) => selectedAddons.includes(a.id)).reduce(
        (sum, a) => sum + a.price,
        0
      ),
    [selectedAddons]
  );

  const configuredTotalPrice =
    activeConfigModel.basePrice +
    activeTrim.priceDelta +
    activePaint.priceDelta +
    addonsTotal;

  const downPaymentAmount = Math.round((configuredTotalPrice * downPaymentPercent) / 100);
  const financedPrincipal = configuredTotalPrice - downPaymentAmount;
  // Yillik 16% avtokredit stavkasi bo'yicha annuitet hisobi
  const monthlyRate = 0.16 / 12;
  const monthlyPayment = Math.round(
    (financedPrincipal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanMonths))
  );

  const handleSelectModelInConfigurator = (model: ChevyModel) => {
    setSelectedModelId(model.id);
    setSelectedTrimId(model.trims[model.trims.length - 1].id);
    setDetailModel(null);
    const el = document.getElementById('konfigurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGenerateQuote = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setQuoteCode(`CHV-2026-${randomNum}`);
    setQuoteModalOpen(true);
  };

  const handleSubmitTestDrive = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = tdPhone.replace(/\s+/g, '');
    if (!tdName.trim()) {
      setTdError('Iltimos, ism va familiyangizni kiriting.');
      return;
    }
    if (cleanedPhone.length < 12) {
      setTdError('Telefon raqamingizni to‘liq kiriting (masalan: +998 90 123 45 67).');
      return;
    }
    setTdError('');
    const chosenModel =
      CHEVY_MODELS.find((m) => m.id === tdModelId)?.name || 'Chevrolet';
    const newBooking: TestDriveBooking = {
      id: `td-${Date.now()}`,
      modelName: chosenModel,
      dealership: tdDealer,
      date: tdDate,
      customerName: tdName.trim(),
      phone: tdPhone.trim(),
      createdAt: 'Hozirgina tasdiqlandi',
    };
    setBookings((prev) => [newBooking, ...prev]);
    setTdSuccess(
      `${chosenModel} uchun test-drayv arizangiz qabul qilindi. Dilerlik mutaxassisi siz bilan bog‘lanadi.`
    );
    setTdName('');
    setTdPhone('+998 ');
    setTimeout(() => setTdSuccess(''), 5000);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5]">
      {/* ------------------------------------------------------------------ */}
      {/* TOP BAR CONTRACT: 3 ZONES (Brand — 4 Nav Links — 1 Primary Action) */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/90">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-wider uppercase text-white whitespace-nowrap shrink-0"
          >
            <ChevroletBowtie className="w-7 h-3.5" />
            <span>Chevrolet</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
            <a
              href="#modellar"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Modellar
            </a>
            <a
              href="#konfigurator"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Konfigurator
            </a>
            <a
              href="#texnologiya"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Texnologiya
            </a>
            <a
              href="#test-drayv"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Test-drayv
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <a
              href="#test-drayv"
              className="px-4 py-2 text-xs font-semibold text-[#09090B] bg-[#D4AF37] hover:bg-[#E5C158] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Test-drayvga yozilish
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------------------------------------------------------------- */}
        {/* HERO SECTION: SPLIT SHOWROOM STAGE + 4-COLUMN KPI STRIP          */}
        {/* ---------------------------------------------------------------- */}
        <section className="max-w-[1200px] mx-auto px-6 pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div className="space-y-6">
                <p className="text-xs font-medium text-[#D4AF37] tracking-wide">
                  2026 Flagman Liniyasi · Rasmiy Avtosalon
                </p>

                <h1
                  className="font-display font-semibold tracking-tight text-white leading-[1.06]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                    textWrap: 'balance',
                  }}
                >
                  Harakat kuchi va muhandislik nafosati
                </h1>

                <p className="text-base text-zinc-400 leading-relaxed max-w-[54ch]">
                  Shahardagi chaqqon Onix sedanidan tortib, Ultium elektr platformasidagi
                  Equinox EV va qudratli Tahoe High Country flagmanigacha — barcha
                  modellarni o‘z didingizga moslab yig‘ing.
                </p>
              </div>

              <div className="pt-8 flex flex-wrap items-center gap-5">
                <a
                  href="#konfigurator"
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-[#09090B] text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Avtomobilni yig‘ish</span>
                </a>

                <a
                  href="#modellar"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200 hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Modellarni ko‘rish</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="h-full min-h-[320px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-zinc-800 bg-[#121215]">
                <SafeAutomotiveImage
                  src={IMAGES.hero}
                  alt="Chevrolet flagman avtosalonida qora Blazer RS va Tahoe liniyasi"
                  title="Chevrolet Flagman Avtosalon"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 4-Column Full-Width KPI Strip */}
          <div className="mt-14 pt-8 border-t border-zinc-800 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="font-display font-semibold text-3xl tracking-tight text-white font-mono-tabular">
                9 ta model
              </p>
              <p className="text-sm text-zinc-400 mt-1">
                Sedandan tortib superkargacha
              </p>
            </div>
            <div>
              <p className="font-display font-semibold text-3xl tracking-tight text-white font-mono-tabular">
                495 ot kuchi
              </p>
              <p className="text-sm text-zinc-400 mt-1">
                Corvette Stingray 6.2L V8 quvvati
              </p>
            </div>
            <div>
              <p className="font-display font-semibold text-3xl tracking-tight text-white font-mono-tabular">
                512 km
              </p>
              <p className="text-sm text-zinc-400 mt-1">
                Equinox EV bir quvvatdagi masofa
              </p>
            </div>
            <div>
              <p className="font-display font-semibold text-3xl tracking-tight text-white font-mono-tabular">
                5 yil
              </p>
              <p className="text-sm text-zinc-400 mt-1">
                Rasmiy zavod kafolati va servis
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 1: MODELLAR KATALOGI (UNIFORM STUDIO RETAIL GRID)        */}
        {/* ---------------------------------------------------------------- */}
        <section id="modellar" className="border-t border-zinc-800 bg-[#0E0E11]">
          <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-medium text-[#D4AF37]">
                  Rasmiy katalog · 2026 modellar qatori
                </p>
                <h2
                  className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-white"
                  style={{ textWrap: 'balance' }}
                >
                  O‘zingizga mos Chevrolet modelini tanlang
                </h2>
              </div>

              <div
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg self-start"
                role="tablist"
                aria-label="Kuzov turi bo‘yicha filtrlash"
              >
                {(
                  [
                    { key: 'all', label: 'Barchasi (9)' },
                    { key: 'sedan', label: 'Sedan' },
                    { key: 'crossover', label: 'Krossover' },
                    { key: 'suv', label: 'Elektr va SUV' },
                    { key: 'sport', label: 'Sportkar' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={bodyFilter === tab.key}
                    onClick={() => setBodyFilter(tab.key)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      bodyFilter === tab.key
                        ? 'bg-[#D4AF37] text-[#09090B] font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model) => (
                <article
                  key={model.id}
                  className="group bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between transition-colors hover:border-zinc-600"
                >
                  <div>
                    <div className="aspect-[4/3] overflow-hidden bg-[#09090B] border-b border-zinc-800">
                      <SafeAutomotiveImage
                        src={model.image}
                        alt={model.name}
                        title={model.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                        <span>
                          <span className="font-mono-tabular text-[#D4AF37]">{model.number}</span>
                          {' · '}
                          {model.categoryLabel}
                          {' · '}
                          {model.drivetrain}
                        </span>
                        <span className="font-mono-tabular text-zinc-500">
                          {model.warranty}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display font-semibold text-xl text-white">
                          {model.name}
                        </h3>
                        <p className="font-mono-tabular text-base font-semibold text-[#D4AF37]">
                          {formatSom(model.basePrice)} dan
                        </p>
                      </div>

                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {model.tagline}
                      </p>

                      <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="text-zinc-500">Dvigatel</p>
                          <p className="text-zinc-200 font-medium mt-0.5 truncate">
                            {model.trims[model.trims.length - 1].engine}
                          </p>
                        </div>
                        <div>
                          <p className="text-zinc-500">Uzatma</p>
                          <p className="text-zinc-200 font-medium mt-0.5 truncate">
                            {model.transmission}
                          </p>
                        </div>
                        <div>
                          <p className="text-zinc-500">Sarf / Masofa</p>
                          <p className="text-zinc-200 font-medium mt-0.5 truncate">
                            {model.fuelOrRange}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setDetailModel(model)}
                      className="px-4 py-2.5 text-xs font-medium text-zinc-200 border border-zinc-700 hover:border-zinc-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Texnik pasport
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectModelInConfigurator(model)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#09090B] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Konfiguratsiya qilish</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 2: INTERACTIVE VEHICLE CONFIGURATOR & LOAN CALCULATOR    */}
        {/* ---------------------------------------------------------------- */}
        <section id="konfigurator" className="border-t border-zinc-800 bg-[#09090B]">
          <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24">
            <div className="space-y-2 max-w-2xl mb-10">
              <p className="text-xs font-medium text-[#D4AF37]">
                Interaktiv studiya · Shaxsiy yig‘ish tizimi
              </p>
              <h2
                className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                O‘z Chevrolet avtomobilingizni noldan yig‘ing
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Sticky Visual Stage & Live Summary */}
              <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-6">
                <div className="bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden">
                  <div className="aspect-[16/10] bg-[#09090B] relative overflow-hidden border-b border-zinc-800">
                    <SafeAutomotiveImage
                      src={activeConfigModel.image}
                      alt={activeConfigModel.name}
                      title={activeConfigModel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-zinc-400">
                          {activeConfigModel.categoryLabel} · {activeTrim.name} ·{' '}
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className="inline-block w-2.5 h-2.5 rounded-full border border-zinc-500"
                              style={{ backgroundColor: activePaint.hex }}
                            />
                            {activePaint.name}
                          </span>
                        </p>
                        <h3 className="font-display font-semibold text-2xl text-white mt-1">
                          {activeConfigModel.name}
                        </h3>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-zinc-400">Yakuniy komplektatsiya narxi</p>
                        <p className="font-mono-tabular text-2xl font-bold text-[#D4AF37] mt-0.5">
                          {formatSom(configuredTotalPrice)}
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Trim Specs Row */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                      <div>
                        <p className="text-xs text-zinc-500">Quvvat</p>
                        <p className="font-mono-tabular text-base font-semibold text-white mt-0.5">
                          {activeTrim.powerHp} ot kuchi
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">0–100 km/s</p>
                        <p className="font-mono-tabular text-base font-semibold text-white mt-0.5">
                          {activeTrim.acceleration}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Dvigatel</p>
                        <p className="text-sm font-medium text-white mt-0.5 truncate">
                          {activeTrim.engine}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800">
                      <p className="text-xs text-zinc-400 mb-2">
                        {activeTrim.name} komplektatsiyasi tarkibi:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeTrim.highlights.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-zinc-300"
                          >
                            <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Contiguous Configuration & Credit Module */}
              <div className="lg:col-span-5 bg-[#121215] border border-zinc-800 rounded-2xl p-6 space-y-6">
                {/* Step 1: Model Selection */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-medium text-zinc-400">
                    1. Modelni tanlang
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CHEVY_MODELS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedModelId(m.id);
                          setSelectedTrimId(m.trims[0].id);
                        }}
                        className={`px-3 py-2.5 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                          selectedModelId === m.id
                            ? 'bg-zinc-900 border-[#D4AF37] text-white font-semibold'
                            : 'bg-[#09090B] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                        }`}
                      >
                        <span className="block truncate">
                          {m.name.replace('Chevrolet ', '')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Trim Selection */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-medium text-zinc-400">
                    2. Komplektatsiya darajasi
                  </label>
                  <div className="space-y-2">
                    {activeConfigModel.trims.map((trim) => (
                      <button
                        key={trim.id}
                        type="button"
                        onClick={() => setSelectedTrimId(trim.id)}
                        className={`w-full px-3.5 py-3 rounded-lg border flex items-center justify-between gap-3 text-left transition-colors cursor-pointer ${
                          activeTrim.id === trim.id
                            ? 'bg-zinc-900 border-[#D4AF37] text-white'
                            : 'bg-[#09090B] border-zinc-800 text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {trim.name}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {trim.engine} · {trim.powerHp} ot kuchi
                          </p>
                        </div>
                        <span className="font-mono-tabular text-xs font-medium text-[#D4AF37] shrink-0">
                          {trim.priceDelta === 0
                            ? 'Asosiy narx'
                            : `+${formatSom(trim.priceDelta)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Paint Selection */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-400">3. Kuzov rangi</span>
                    <span className="text-zinc-200">{activePaint.name}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {PAINT_OPTIONS.map((paint) => {
                      const active = paint.id === selectedPaintId;
                      return (
                        <button
                          key={paint.id}
                          type="button"
                          onClick={() => setSelectedPaintId(paint.id)}
                          aria-label={paint.name}
                          title={`${paint.name} ${
                            paint.priceDelta > 0 ? `(+${formatSom(paint.priceDelta)})` : ''
                          }`}
                          className={`w-9 h-9 rounded-full border-2 transition-transform cursor-pointer ${
                            active
                              ? 'border-[#D4AF37] scale-110'
                              : 'border-zinc-700 hover:border-zinc-400'
                          }`}
                          style={{ backgroundColor: paint.hex }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Optional Packages */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-medium text-zinc-400">
                    4. Qo‘shimcha jihozlar
                  </label>
                  <div className="space-y-2">
                    {ADDON_PACKAGES.map((pkg) => {
                      const checked = selectedAddons.includes(pkg.id);
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => toggleAddon(pkg.id)}
                          className={`w-full p-3 rounded-lg border flex items-start justify-between gap-3 text-left transition-colors cursor-pointer ${
                            checked
                              ? 'bg-zinc-900 border-[#D4AF37]'
                              : 'bg-[#09090B] border-zinc-800 hover:border-zinc-600'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <span
                              className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center shrink-0 ${
                                checked
                                  ? 'bg-[#D4AF37] border-[#D4AF37] text-[#09090B]'
                                  : 'border-zinc-600'
                              }`}
                            >
                              {checked && <Check className="w-3 h-3" />}
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-white">{pkg.name}</p>
                              <p className="text-[11px] text-zinc-500 mt-0.5">
                                {pkg.description}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono-tabular text-xs text-zinc-300 shrink-0">
                            +{formatSom(pkg.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 5: Monthly Payment Simulator */}
                <div className="pt-4 border-t border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-zinc-300">
                      5. Oylik to‘lov kalkulyatori
                    </p>
                    <span className="text-[11px] text-zinc-500">Yillik 16% hisobida</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-400">Boshlang‘ich to‘lov</span>
                        <span className="font-mono-tabular text-white font-medium">
                          {downPaymentPercent}% ({formatSom(downPaymentAmount)})
                        </span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={60}
                        step={5}
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className="w-full accent-[#D4AF37] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-400">To‘lov muddati</span>
                        <span className="font-mono-tabular text-white font-medium">
                          {loanMonths} oy
                        </span>
                      </div>
                      <input
                        type="range"
                        min={12}
                        max={60}
                        step={12}
                        value={loanMonths}
                        onChange={(e) => setLoanMonths(Number(e.target.value))}
                        className="w-full accent-[#D4AF37] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="bg-[#09090B] border border-zinc-800 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-zinc-400">Taxminiy oylik to‘lov</p>
                      <p className="font-mono-tabular text-xl font-bold text-[#D4AF37] mt-0.5">
                        {formatSom(monthlyPayment)} / oy
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerateQuote}
                      className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#09090B] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Taklif olish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 3: ENGINEERING PILLARS & TEST DRIVE BOOKING              */}
        {/* ---------------------------------------------------------------- */}
        <section id="texnologiya" className="border-t border-zinc-800 bg-[#0E0E11]">
          <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left: Engineering Pillars & Spec Comparison */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#D4AF37]">
                    Muhandislik standarti
                  </p>
                  <h2
                    className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-white"
                    style={{ textWrap: 'balance' }}
                  >
                    Har bir kilometrda ishonch va texnologiya
                  </h2>
                </div>

                <div className="divide-y divide-zinc-800 border-t border-b border-zinc-800">
                  {ENGINEERING_PILLARS.map((pillar) => (
                    <div key={pillar.number} className="py-6 space-y-2">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono-tabular text-xs font-semibold text-[#D4AF37]">
                          {pillar.number}.
                        </span>
                        <h3 className="font-display font-semibold text-lg text-white">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed pl-7">
                        {pillar.description}
                      </p>
                      <p className="text-xs text-zinc-300 font-medium pl-7 pt-1">
                        {pillar.metric}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Comparison Matrix */}
                <div className="bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-zinc-800">
                    <h3 className="font-display font-semibold text-base text-white">
                      Modellarni tezkor taqqoslash
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-400">
                          <th className="py-3 px-4 font-medium">Model</th>
                          <th className="py-3 px-4 font-medium text-right">Quvvat</th>
                          <th className="py-3 px-4 font-medium text-right">Bagaj</th>
                          <th className="py-3 px-4 font-medium text-right">Boshlang‘ich narx</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                        {CHEVY_MODELS.map((m) => (
                          <tr key={m.id} className="hover:bg-zinc-900/60 transition-colors">
                            <td className="py-3 px-4 font-medium text-white whitespace-nowrap">
                              {m.name.replace('Chevrolet ', '')}
                            </td>
                            <td className="py-3 px-4 text-right font-mono-tabular text-zinc-300 whitespace-nowrap">
                              {m.trims[m.trims.length - 1].powerHp} HP
                            </td>
                            <td className="py-3 px-4 text-right font-mono-tabular text-zinc-300 whitespace-nowrap">
                              {m.specsSummary.trunk.split('/')[0].trim()}
                            </td>
                            <td className="py-3 px-4 text-right font-mono-tabular text-[#D4AF37] font-semibold whitespace-nowrap">
                              {formatSom(m.basePrice)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right: Test Drive Booking Form */}
              <div id="test-drayv" className="lg:col-span-6 space-y-6">
                <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[#D4AF37]">
                      Rasmiy avtosalon xizmati
                    </p>
                    <h2 className="font-display font-semibold text-2xl text-white">
                      Test-drayvga yoziling
                    </h2>
                    <p className="text-sm text-zinc-400">
                      O‘zingizga yaqin rasmiy Chevrolet dilerlik markazini tanlang va
                      avtomobilni shaxsan haydab sinab ko‘ring.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitTestDrive} className="space-y-4">
                    <div>
                      <label
                        htmlFor="td-model"
                        className="block text-xs font-medium text-zinc-300 mb-1.5"
                      >
                        Sinov uchun model
                      </label>
                      <select
                        id="td-model"
                        value={tdModelId}
                        onChange={(e) => setTdModelId(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        {CHEVY_MODELS.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="td-dealer"
                        className="block text-xs font-medium text-zinc-300 mb-1.5"
                      >
                        Dilerlik markazi
                      </label>
                      <div className="relative">
                        <select
                          id="td-dealer"
                          value={tdDealer}
                          onChange={(e) => setTdDealer(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          {DEALERSHIPS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="td-date"
                          className="block text-xs font-medium text-zinc-300 mb-1.5"
                        >
                          Tashrif sanasi
                        </label>
                        <input
                          id="td-date"
                          type="date"
                          value={tdDate}
                          onChange={(e) => setTdDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-zinc-700 rounded-lg text-white font-mono-tabular focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="td-phone"
                          className="block text-xs font-medium text-zinc-300 mb-1.5"
                        >
                          Telefon raqamingiz
                        </label>
                        <input
                          id="td-phone"
                          type="tel"
                          value={tdPhone}
                          onChange={(e) => setTdPhone(e.target.value)}
                          placeholder="+998 90 123 45 67"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-zinc-700 rounded-lg text-white font-mono-tabular focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="td-name"
                        className="block text-xs font-medium text-zinc-300 mb-1.5"
                      >
                        Ism va familiyangiz
                      </label>
                      <input
                        id="td-name"
                        type="text"
                        value={tdName}
                        onChange={(e) => setTdName(e.target.value)}
                        placeholder="Masalan: Azizbek Rahimov"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {tdError && <p className="text-xs text-rose-400">{tdError}</p>}
                    {tdSuccess && (
                      <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-xs text-emerald-300 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>{tdSuccess}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 px-5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#09090B] text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Test-drayvni tasdiqlash
                    </button>
                  </form>
                </div>

                {/* Confirmed Bookings History */}
                {bookings.length > 0 && (
                  <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-sm text-white">
                        Tasdiqlangan arizalar ({bookings.length})
                      </h3>
                      <button
                        type="button"
                        onClick={() => setBookings([])}
                        className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer"
                      >
                        Tozalash
                      </button>
                    </div>
                    <div className="divide-y divide-zinc-800">
                      {bookings.map((b) => (
                        <div key={b.id} className="py-3 flex items-start justify-between gap-3">
                          <div className="space-y-1 min-w-0">
                            <p className="text-sm font-medium text-white">
                              {b.modelName} — {b.customerName}
                            </p>
                            <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                              <span className="truncate">{b.dealership}</span>
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-mono-tabular text-xs text-[#D4AF37] flex items-center justify-end gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{b.date}</span>
                            </p>
                            <p className="text-[11px] text-zinc-500 mt-0.5">
                              {b.createdAt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* QUIET FOOTER                                                       */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-zinc-800 bg-[#09090B]">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2.5">
              <ChevroletBowtie className="w-6 h-3" />
              <span className="font-display font-bold text-sm tracking-wider uppercase text-white">
                Chevrolet
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              Flagman avtosalon va raqamli konfigurator platformasi · 2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <a href="#modellar" className="hover:text-white transition-colors">
              Modellar
            </a>
            <a href="#konfigurator" className="hover:text-white transition-colors">
              Konfigurator
            </a>
            <a href="#texnologiya" className="hover:text-white transition-colors">
              Texnologiya
            </a>
            <a href="#test-drayv" className="hover:text-white transition-colors">
              Test-drayv
            </a>
          </div>
        </div>
      </footer>

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: TECHNICAL PASSPORT & MODEL SPECIFICATION                  */}
      {/* ------------------------------------------------------------------ */}
      {detailModel && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="spec-modal-title"
          onClick={() => setDetailModel(null)}
        >
          <div
            className="bg-[#121215] border border-zinc-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#D4AF37]">
                  {detailModel.number} · {detailModel.categoryLabel} · Texnik pasport
                </p>
                <h3
                  id="spec-modal-title"
                  className="font-display font-semibold text-xl text-white"
                >
                  {detailModel.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailModel(null)}
                aria-label="Yopish"
                className="w-9 h-9 rounded-lg border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-[16/9] bg-[#09090B] border-b border-zinc-800">
              <SafeAutomotiveImage
                src={detailModel.image}
                alt={detailModel.name}
                title={detailModel.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-5">
              <p className="text-sm text-zinc-300 leading-relaxed">
                {detailModel.tagline}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#09090B] border border-zinc-800 text-xs">
                <div>
                  <p className="text-zinc-500">Uzunligi</p>
                  <p className="font-mono-tabular text-white font-medium mt-1">
                    {detailModel.specsSummary.length}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500">G‘ildirak bazasi</p>
                  <p className="font-mono-tabular text-white font-medium mt-1">
                    {detailModel.specsSummary.wheelbase}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500">Yukxona hajmi</p>
                  <p className="font-mono-tabular text-white font-medium mt-1">
                    {detailModel.specsSummary.trunk}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500">Kafolat</p>
                  <p className="font-mono-tabular text-[#D4AF37] font-medium mt-1">
                    {detailModel.warranty}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div>
                  <p className="text-xs text-zinc-500">Boshlang‘ich narx</p>
                  <p className="font-mono-tabular text-lg font-bold text-[#D4AF37]">
                    {formatSom(detailModel.basePrice)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectModelInConfigurator(detailModel)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#09090B] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <span>Konfiguratorda yig‘ish</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2: OFFICIAL CONFIGURED VEHICLE RESERVATION RECEIPT           */}
      {/* ------------------------------------------------------------------ */}
      {quoteModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
          onClick={() => setQuoteModalOpen(false)}
        >
          <div
            className="bg-[#121215] border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <p className="font-mono-tabular text-xs text-[#D4AF37]">
                  Shaxsiy taklif raqami: #{quoteCode}
                </p>
                <h3
                  id="quote-modal-title"
                  className="font-display font-semibold text-xl text-white mt-1"
                >
                  {activeConfigModel.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuoteModalOpen(false)}
                aria-label="Yopish"
                className="w-8 h-8 rounded-lg border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-zinc-800/70">
                <span className="text-zinc-400">Komplektatsiya</span>
                <span className="text-white font-medium">{activeTrim.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800/70">
                <span className="text-zinc-400">Kuzov rangi</span>
                <span className="text-white font-medium">{activePaint.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800/70">
                <span className="text-zinc-400">Qo‘shimcha paketlar</span>
                <span className="text-white font-medium">
                  {selectedAddons.length > 0
                    ? `${selectedAddons.length} ta tanlangan`
                    : 'Standart'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800/70">
                <span className="text-zinc-400">
                  Boshlang‘ich to‘lov ({downPaymentPercent}%)
                </span>
                <span className="font-mono-tabular text-white font-medium">
                  {formatSom(downPaymentAmount)}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800/70">
                <span className="text-zinc-400">Oylik to‘lov ({loanMonths} oy)</span>
                <span className="font-mono-tabular text-[#D4AF37] font-semibold">
                  {formatSom(monthlyPayment)} / oy
                </span>
              </div>
              <div className="flex justify-between pt-2 text-sm">
                <span className="text-zinc-300 font-medium">Umumiy qiymat</span>
                <span className="font-mono-tabular text-white font-bold">
                  {formatSom(configuredTotalPrice)}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setQuoteModalOpen(false)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white cursor-pointer"
              >
                Yopish
              </button>
              <a
                href="#test-drayv"
                onClick={() => {
                  setTdModelId(activeConfigModel.id);
                  setQuoteModalOpen(false);
                }}
                className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#09090B] text-xs font-semibold rounded-lg transition-colors"
              >
                Shu modelni test-drayvga yozish
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
