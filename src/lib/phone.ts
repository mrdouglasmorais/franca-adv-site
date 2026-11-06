export type DialOption = {
  iso: string;
  code: string;
  name: string;
};

export function flagEmoji(iso: string) {
  return [...iso.toUpperCase()]
    .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
    .join("");
}

export type DialGroup = {
  region: string;
  options: DialOption[];
};

export const DIAL_GROUPS: DialGroup[] = [
  {
    region: "Brasil",
    options: [{ iso: "BR", code: "55", name: "Brasil" }],
  },
  {
    region: "América do Sul",
    options: [
      { iso: "AR", code: "54", name: "Argentina" },
      { iso: "BO", code: "591", name: "Bolívia" },
      { iso: "CL", code: "56", name: "Chile" },
      { iso: "CO", code: "57", name: "Colômbia" },
      { iso: "EC", code: "593", name: "Equador" },
      { iso: "GY", code: "592", name: "Guiana" },
      { iso: "PY", code: "595", name: "Paraguai" },
      { iso: "PE", code: "51", name: "Peru" },
      { iso: "SR", code: "597", name: "Suriname" },
      { iso: "UY", code: "598", name: "Uruguai" },
      { iso: "VE", code: "58", name: "Venezuela" },
    ],
  },
  {
    region: "América do Norte e Central",
    options: [
      { iso: "CR", code: "506", name: "Costa Rica" },
      { iso: "CU", code: "53", name: "Cuba" },
      { iso: "SV", code: "503", name: "El Salvador" },
      { iso: "US", code: "1", name: "EUA e Canadá" },
      { iso: "GT", code: "502", name: "Guatemala" },
      { iso: "HT", code: "509", name: "Haiti" },
      { iso: "HN", code: "504", name: "Honduras" },
      { iso: "MX", code: "52", name: "México" },
      { iso: "NI", code: "505", name: "Nicarágua" },
      { iso: "PA", code: "507", name: "Panamá" },
    ],
  },
  {
    region: "Europa",
    options: [
      { iso: "DE", code: "49", name: "Alemanha" },
      { iso: "AT", code: "43", name: "Áustria" },
      { iso: "BE", code: "32", name: "Bélgica" },
      { iso: "BG", code: "359", name: "Bulgária" },
      { iso: "DK", code: "45", name: "Dinamarca" },
      { iso: "SK", code: "421", name: "Eslováquia" },
      { iso: "SI", code: "386", name: "Eslovênia" },
      { iso: "ES", code: "34", name: "Espanha" },
      { iso: "FI", code: "358", name: "Finlândia" },
      { iso: "FR", code: "33", name: "França" },
      { iso: "GR", code: "30", name: "Grécia" },
      { iso: "NL", code: "31", name: "Países Baixos" },
      { iso: "HU", code: "36", name: "Hungria" },
      { iso: "IE", code: "353", name: "Irlanda" },
      { iso: "IT", code: "39", name: "Itália" },
      { iso: "LU", code: "352", name: "Luxemburgo" },
      { iso: "NO", code: "47", name: "Noruega" },
      { iso: "PL", code: "48", name: "Polônia" },
      { iso: "PT", code: "351", name: "Portugal" },
      { iso: "GB", code: "44", name: "Reino Unido" },
      { iso: "RO", code: "40", name: "Romênia" },
      { iso: "RU", code: "7", name: "Rússia" },
      { iso: "SE", code: "46", name: "Suécia" },
      { iso: "CH", code: "41", name: "Suíça" },
      { iso: "CZ", code: "420", name: "Tchéquia" },
      { iso: "TR", code: "90", name: "Turquia" },
      { iso: "UA", code: "380", name: "Ucrânia" },
    ],
  },
  {
    region: "África",
    options: [
      { iso: "ZA", code: "27", name: "África do Sul" },
      { iso: "AO", code: "244", name: "Angola" },
      { iso: "CV", code: "238", name: "Cabo Verde" },
      { iso: "EG", code: "20", name: "Egito" },
      { iso: "GW", code: "245", name: "Guiné-Bissau" },
      { iso: "MZ", code: "258", name: "Moçambique" },
      { iso: "NG", code: "234", name: "Nigéria" },
      { iso: "ST", code: "239", name: "São Tomé e Príncipe" },
    ],
  },
  {
    region: "Ásia e Oceania",
    options: [
      { iso: "AU", code: "61", name: "Austrália" },
      { iso: "CN", code: "86", name: "China" },
      { iso: "KR", code: "82", name: "Coreia do Sul" },
      { iso: "AE", code: "971", name: "Emirados Árabes" },
      { iso: "HK", code: "852", name: "Hong Kong" },
      { iso: "IN", code: "91", name: "Índia" },
      { iso: "ID", code: "62", name: "Indonésia" },
      { iso: "IL", code: "972", name: "Israel" },
      { iso: "JP", code: "81", name: "Japão" },
      { iso: "MO", code: "853", name: "Macau" },
      { iso: "MY", code: "60", name: "Malásia" },
      { iso: "NZ", code: "64", name: "Nova Zelândia" },
      { iso: "PH", code: "63", name: "Filipinas" },
      { iso: "SG", code: "65", name: "Singapura" },
      { iso: "TH", code: "66", name: "Tailândia" },
      { iso: "TL", code: "670", name: "Timor-Leste" },
      { iso: "VN", code: "84", name: "Vietnã" },
    ],
  },
];

const DIAL_CODES = new Set(DIAL_GROUPS.flatMap((group) => group.options.map((option) => option.code)));

const CODES_BY_LENGTH = [...DIAL_CODES].sort((a, b) => b.length - a.length);

export function dialByCode(value: string) {
  const code = callingCode(value);
  for (const group of DIAL_GROUPS) {
    const option = group.options.find((item) => item.code === code);
    if (option) return option;
  }
  return DIAL_GROUPS[0].options[0];
}

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
