import { practiceAreas } from "@/content/areas";
import { isKnownDdi, splitCallingCode } from "@/lib/phone";

const AREA_SLUGS = new Set(practiceAreas.map((area) => area.slug));

export function isValidEmail(value: string) {
  const email = value.trim();
  if (email.length > 254 || email.includes("..")) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function ddiCode(value: string) {
  return digitsOnly(value).replace(/^0+/, "");
}

export function nameError(value: string) {
  const name = value.trim().replace(/\s+/g, " ");
  if (!name) return "Informe o nome completo.";
  if (name.length > 120) return "O nome deve ter no máximo 120 caracteres.";
  if (!/^[\p{L}][\p{L}\s'.’-]*$/u.test(name)) return "Use apenas letras no nome.";
  const parts = name.split(" ").filter((part) => part.replace(/[.'’-]/g, "").length >= 2);
  if (parts.length < 2) return "Informe nome e sobrenome.";
  return null;
}

export function emailError(value: string, required: boolean) {
  const email = value.trim();
  if (!email) return required ? "Informe o e-mail." : null;
  if (!isValidEmail(email)) return "Informe um e-mail válido.";
  return null;
}

export function phoneLineError(ddiRaw: string, nationalRaw: string, required: boolean) {
  const ddi = ddiCode(ddiRaw);
  const national = digitsOnly(nationalRaw);
  const ddiBlank = ddiRaw.trim() === "" || ddiRaw.trim() === "+";

  if (!national) {
    if (required) return { phone: "Informe o telefone com DDI." };
    if (ddiBlank || ddi === "55") return {};
    if (!isKnownDdi(ddi)) return { ddi: "Selecione o DDI." };
    return { phone: "Informe o número depois do DDI." };
  }

  if (ddiBlank || !ddi || !isKnownDdi(ddi)) return { ddi: "Selecione o DDI." };
  if (ddi.length + national.length < 8 || ddi.length + national.length > 15) {
    return { phone: "Confira o DDI e o número." };
  }
  if (/^(\d)\1+$/.test(national)) return { phone: "Informe um telefone válido." };
  if (ddi === "55" && !isValidBrPhone(national)) {
    return { phone: "No Brasil, informe o DDD e o número, com 10 ou 11 dígitos." };
  }
  if (ddi !== "55" && (national.length < 6 || national.length > 12)) {
    return { phone: "Informe o número depois do DDI." };
  }
  return {};
}

export function composePhone(ddiRaw: string, nationalRaw: string) {
  return `+${ddiCode(ddiRaw)}${digitsOnly(nationalRaw)}`;
}

export function messageError(value: string, min: number, max: number) {
  const message = value.trim();
  if (min > 0 && !message) return "Escreva a mensagem.";
  if (min > 0 && message.length < min) return `Escreva pelo menos ${min} caracteres.`;
  if (message.length > max) return `Use no máximo ${max} caracteres.`;
  return null;
}

export function areaError(slug: string) {
  if (!slug) return null;
  if (!AREA_SLUGS.has(slug)) return "Selecione uma das áreas do escritório.";
  return null;
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
  const invalidName = nameError(name);
  if (invalidName) return { ok: false, error: invalidName };

  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const phoneRaw = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const ddiRaw = typeof raw.ddi === "string" ? raw.ddi.trim() : "";
  const invalidEmail = emailError(email, false);
  if (invalidEmail) return { ok: false, error: invalidEmail };

  let phone = "";
  if (phoneRaw.startsWith("+") || phoneRaw.replace(/[\s()-]/g, "").startsWith("+")) {
    const split = splitCallingCode(phoneRaw);
    if (!split) return { ok: false, error: "Selecione o DDI." };
    const line = phoneLineError(`+${split.ddi}`, split.national, false);
    const lineError = line.ddi ?? line.phone;
    if (lineError) return { ok: false, error: lineError };
    phone = `+${split.ddi}${split.national}`;
  } else if (digitsOnly(phoneRaw)) {
    const line = phoneLineError(ddiRaw, phoneRaw, false);
    const lineError = line.ddi ?? line.phone;
    if (lineError) return { ok: false, error: lineError };
    phone = composePhone(ddiRaw, phoneRaw);
  } else if (ddiRaw && ddiCode(ddiRaw) !== "55") {
    return { ok: false, error: "Informe o número depois do DDI." };
  }

  if (!email && !phone) return { ok: false, error: "Informe o e-mail ou o telefone com DDI." };

  const areaSlug = typeof raw.areaSlug === "string" ? raw.areaSlug.trim() : "";
  const invalidArea = areaError(areaSlug);
  if (invalidArea) return { ok: false, error: invalidArea };

  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const invalidMessage = messageError(message, 10, 5000);
  if (invalidMessage) return { ok: false, error: invalidMessage };

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
  const invalidName = nameError(name);
  if (invalidName) return { ok: false, error: invalidName };

  const email = String(form.get("email") ?? "").trim();
  const invalidEmail = emailError(email, true);
  if (invalidEmail) return { ok: false, error: invalidEmail };

  const phoneRaw = String(form.get("phone") ?? "").trim();
  const ddiRaw = String(form.get("ddi") ?? "").trim();
  let phone = "";
  if (digitsOnly(phoneRaw)) {
    const line = phoneLineError(ddiRaw || "+55", phoneRaw, false);
    const lineError = line.ddi ?? line.phone;
    if (lineError) return { ok: false, error: lineError };
    phone = composePhone(ddiRaw || "+55", phoneRaw);
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
