export type DialOption = {
  code: string;
  name: string;
};

export type DialGroup = {
  region: string;
  options: DialOption[];
};

export const DIAL_GROUPS: DialGroup[] = [
  {
    region: "Brasil",
    options: [{ code: "55", name: "Brasil" }],
  },
  {
    region: "América do Sul",
    options: [
      { code: "54", name: "Argentina" },
      { code: "591", name: "Bolívia" },
      { code: "56", name: "Chile" },
      { code: "57", name: "Colômbia" },
      { code: "593", name: "Equador" },
      { code: "592", name: "Guiana" },
      { code: "595", name: "Paraguai" },
      { code: "51", name: "Peru" },
      { code: "597", name: "Suriname" },
      { code: "598", name: "Uruguai" },
      { code: "58", name: "Venezuela" },
    ],
  },
  {
    region: "América do Norte e Central",
    options: [
      { code: "506", name: "Costa Rica" },
      { code: "53", name: "Cuba" },
      { code: "503", name: "El Salvador" },
      { code: "1", name: "EUA e Canadá" },
      { code: "502", name: "Guatemala" },
      { code: "509", name: "Haiti" },
      { code: "504", name: "Honduras" },
      { code: "52", name: "México" },
      { code: "505", name: "Nicarágua" },
      { code: "507", name: "Panamá" },
    ],
  },
  {
    region: "Europa",
    options: [
      { code: "49", name: "Alemanha" },
      { code: "43", name: "Áustria" },
      { code: "32", name: "Bélgica" },
      { code: "359", name: "Bulgária" },
      { code: "45", name: "Dinamarca" },
      { code: "421", name: "Eslováquia" },
      { code: "386", name: "Eslovênia" },
      { code: "34", name: "Espanha" },
      { code: "358", name: "Finlândia" },
      { code: "33", name: "França" },
      { code: "30", name: "Grécia" },
      { code: "31", name: "Países Baixos" },
      { code: "36", name: "Hungria" },
      { code: "353", name: "Irlanda" },
      { code: "39", name: "Itália" },
      { code: "352", name: "Luxemburgo" },
      { code: "47", name: "Noruega" },
      { code: "48", name: "Polônia" },
      { code: "351", name: "Portugal" },
      { code: "44", name: "Reino Unido" },
      { code: "40", name: "Romênia" },
      { code: "7", name: "Rússia" },
      { code: "46", name: "Suécia" },
      { code: "41", name: "Suíça" },
      { code: "420", name: "Tchéquia" },
      { code: "90", name: "Turquia" },
      { code: "380", name: "Ucrânia" },
    ],
  },
  {
    region: "África",
    options: [
      { code: "27", name: "África do Sul" },
      { code: "244", name: "Angola" },
      { code: "238", name: "Cabo Verde" },
      { code: "20", name: "Egito" },
      { code: "245", name: "Guiné-Bissau" },
      { code: "258", name: "Moçambique" },
      { code: "234", name: "Nigéria" },
      { code: "239", name: "São Tomé e Príncipe" },
    ],
  },
  {
    region: "Ásia e Oceania",
    options: [
      { code: "61", name: "Austrália" },
      { code: "86", name: "China" },
      { code: "82", name: "Coreia do Sul" },
      { code: "971", name: "Emirados Árabes" },
      { code: "852", name: "Hong Kong" },
      { code: "91", name: "Índia" },
      { code: "62", name: "Indonésia" },
      { code: "972", name: "Israel" },
      { code: "81", name: "Japão" },
      { code: "853", name: "Macau" },
      { code: "60", name: "Malásia" },
      { code: "64", name: "Nova Zelândia" },
      { code: "63", name: "Filipinas" },
      { code: "65", name: "Singapura" },
      { code: "66", name: "Tailândia" },
      { code: "670", name: "Timor-Leste" },
      { code: "84", name: "Vietnã" },
    ],
  },
];

const DIAL_CODES = new Set(DIAL_GROUPS.flatMap((group) => group.options.map((option) => option.code)));

const CODES_BY_LENGTH = [...DIAL_CODES].sort((a, b) => b.length - a.length);

export function callingCode(value: string) {
  return value.replace(/\D/g, "").replace(/^0+/, "");
}

export function isKnownDdi(value: string) {
  return DIAL_CODES.has(callingCode(value));
}

export function splitCallingCode(value: string) {
  const digits = value.replace(/\D/g, "");
  const code = CODES_BY_LENGTH.find((item) => digits.startsWith(item));
  if (!code || digits.length === code.length) return null;
  return { ddi: code, national: digits.slice(code.length) };
}

const MAX_NATIONAL: Record<string, number> = {
  "1": 10,
  "33": 9,
  "34": 9,
  "39": 10,
  "44": 10,
  "351": 9,
  "52": 10,
  "54": 10,
  "55": 11,
  "56": 9,
  "598": 8,
};

export function maxNationalDigits(ddi: string) {
  return MAX_NATIONAL[callingCode(ddi)] ?? 12;
}

export function phonePlaceholder(ddi: string) {
  const code = callingCode(ddi);
  if (code === "55") return "(00) 00000-0000";
  if (code === "1") return "(000) 000-0000";
  if (code === "351" || code === "34" || code === "33") return "000 000 000";
  if (code === "44") return "0000 000000";
  if (code === "52" || code === "54") return "00 0000 0000";
  return "000 000 000 000";
}

function groups(digits: string, sizes: number[], separator: string) {
  const parts: string[] = [];
  let index = 0;
  for (const size of sizes) {
    if (index >= digits.length) break;
    parts.push(digits.slice(index, index + size));
    index += size;
  }
  if (index < digits.length) parts.push(digits.slice(index));
  return parts.join(separator);
}

export function formatNational(ddi: string, rawDigits: string) {
  const code = callingCode(ddi);
  const digits = rawDigits.replace(/\D/g, "").slice(0, maxNationalDigits(code));
  if (!digits) return "";

  if (code === "55") {
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  if (code === "1") {
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (code === "44") return groups(digits, [4, 6], " ");
  if (code === "33") return groups(digits, [1, 2, 2, 2, 2], " ");
  if (code === "52" || code === "54") return groups(digits, [2, 4, 4], " ");
  if (code === "351" || code === "34") return groups(digits, [3, 3, 3], " ");
  return groups(digits, [3, 3, 3, 3], " ");
}

function caretAfterDigitCount(masked: string, count: number) {
  if (count <= 0) return 0;
  let seen = 0;
  for (let index = 0; index < masked.length; index += 1) {
    if (/\d/.test(masked[index] ?? "")) seen += 1;
    if (seen === count) return index + 1;
  }
  return masked.length;
}

export function maskPhoneValue(ddi: string, raw: string, selectionStart: number) {
  const code = callingCode(ddi);
  let digits = raw.replace(/\D/g, "");
  let digitsBefore = raw.slice(0, selectionStart).replace(/\D/g, "").length;
  const max = maxNationalDigits(code);
  if (digits.startsWith(code) && digits.length > max) {
    digits = digits.slice(code.length);
    digitsBefore = Math.max(0, digitsBefore - code.length);
  }
  digits = digits.slice(0, max);
  digitsBefore = Math.min(digitsBefore, digits.length);
  const value = formatNational(code, digits);
  return { value, caret: caretAfterDigitCount(value, digitsBefore) };
}
