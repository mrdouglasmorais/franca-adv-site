import { practiceAreas } from "@/content/areas";

const AREA_SLUGS = new Set(practiceAreas.map((area) => area.slug));

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidBrPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }
  if (digits.length !== 10 && digits.length !== 11) return false;
  const ddd = Number(digits.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;
  if (/^(\d)\1+$/.test(digits)) return false;
  if (digits.length === 11 && digits[2] !== "9") return false;
  return true;
}

export type LeadInput = {
  name: string;
  email?: string;
  phone?: string;
  areaSlug?: string;
  message: string;
  lgpdConsent: true;
};

export function parseLead(body: unknown): { ok: true; data: LeadInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Dados inválidos." };
  const raw = body as Record<string, unknown>;
  if (typeof raw.website === "string" && raw.website.trim()) {
    return { ok: false, error: "Não foi possível enviar." };
  }

  const name = typeof raw.name === "string" ? raw.name.trim().replace(/\s+/g, " ") : "";
  if (name.length < 2) return { ok: false, error: "Informe o nome completo." };

  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  if (!email && !phone) return { ok: false, error: "Informe e-mail ou telefone." };
  if (email && !isValidEmail(email)) return { ok: false, error: "Informe um e-mail válido." };
  if (phone && !isValidBrPhone(phone)) {
    return { ok: false, error: "Informe um telefone com DDD (10 ou 11 dígitos)." };
  }

  const areaSlug = typeof raw.areaSlug === "string" ? raw.areaSlug.trim() : "";
  if (areaSlug && !AREA_SLUGS.has(areaSlug)) {
    return { ok: false, error: "Selecione uma das áreas do escritório." };
  }

  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  if (message.length < 10) return { ok: false, error: "Descreva a demanda com pelo menos 10 caracteres." };
  if (message.length > 5000) return { ok: false, error: "A mensagem deve ter no máximo 5000 caracteres." };

  const consent = raw.lgpdConsent;
  if (consent !== true && consent !== "true" && consent !== "on") {
    return { ok: false, error: "É necessário aceitar a política de privacidade." };
  }

  return {
    ok: true,
    data: {
      name,
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
      ...(areaSlug ? { areaSlug } : {}),
      message,
      lgpdConsent: true,
    },
  };
}

export const CV_MAX_BYTES = 10 * 1024 * 1024;

const CV_EXTENSIONS = new Set(["pdf", "doc", "docx", "odt", "rtf", "txt"]);

export function parseApplication(form: FormData): { ok: true; form: FormData } | { ok: false; error: string } {
  if (String(form.get("website") ?? "").trim()) {
    return { ok: false, error: "Não foi possível enviar." };
  }

  const name = String(form.get("name") ?? "").trim().replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 120) return { ok: false, error: "Informe o nome completo." };

  const email = String(form.get("email") ?? "").trim();
  if (!isValidEmail(email)) return { ok: false, error: "Informe um e-mail válido." };

  const phone = String(form.get("phone") ?? "").trim();
  if (phone && !isValidBrPhone(phone)) {
    return { ok: false, error: "Informe um telefone com DDD ou deixe o campo em branco." };
  }

  const role = String(form.get("role") ?? "").trim();
  const roleOther = String(form.get("roleOther") ?? "").trim();
  const roleTitle = (role === "Outro" ? roleOther : role).replace(/\s+/g, " ");
  if (!roleTitle) return { ok: false, error: "Informe o cargo de interesse." };
  if (roleTitle.length > 120) return { ok: false, error: "O cargo deve ter no máximo 120 caracteres." };

  const message = String(form.get("message") ?? "").trim();
  if (message.length > 4000) return { ok: false, error: "A apresentação deve ter no máximo 4000 caracteres." };

  const consent = String(form.get("lgpdConsent") ?? "").trim().toLowerCase();
  if (!["true", "on", "1", "sim"].includes(consent)) {
    return { ok: false, error: "É preciso autorizar o uso dos dados para a seleção." };
  }

  const file = form.get("curriculum");
  if (!(file instanceof File) || file.size <= 0) return { ok: false, error: "Anexe o currículo." };
  if (file.size > CV_MAX_BYTES) return { ok: false, error: "O currículo deve ter no máximo 10 MB." };
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!CV_EXTENSIONS.has(extension)) {
    return { ok: false, error: "Envie o currículo em PDF, DOC, DOCX, ODT, RTF ou TXT." };
  }

  const outbound = new FormData();
  outbound.set("name", name);
  outbound.set("email", email);
  outbound.set("phone", phone);
  outbound.set("role", roleTitle);
  outbound.set("message", message);
  outbound.set("lgpdConsent", "true");
  outbound.set("curriculum", file, file.name);
  return { ok: true, form: outbound };
}
