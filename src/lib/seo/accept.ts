export type Negotiation = "html" | "markdown" | "none";

function parseAccept(header: string) {
  const types = new Map<string, number>();
  for (const part of header.split(",")) {
    const [rawType, ...params] = part.trim().split(";");
    const type = rawType?.trim().toLowerCase();
    if (!type) continue;
    let quality = 1;
    for (const param of params) {
      const [key, value] = param.trim().split("=");
      if (key?.trim() === "q") quality = Number(value);
    }
    types.set(type, Number.isFinite(quality) ? quality : 0);
  }
  return types;
}

function quality(types: Map<string, number>, mediaType: string) {
  if (types.has(mediaType)) return types.get(mediaType) ?? 0;
  const [main] = mediaType.split("/");
  if (main && types.has(`${main}/*`)) return types.get(`${main}/*`) ?? 0;
  if (types.has("*/*")) return types.get("*/*") ?? 0;
  return 0;
}

/** Prefers markdown only when it outranks HTML. Empty Accept stays HTML. */
export function negotiateAccept(header: string | null): Negotiation {
  if (!header?.trim()) return "html";
  const types = parseAccept(header);
  const markdown = quality(types, "text/markdown");
  const html = Math.max(quality(types, "text/html"), quality(types, "application/xhtml+xml"));
  if (markdown > html && markdown > 0) return "markdown";
  if (html > 0 || quality(types, "*/*") > 0) return "html";
  if (markdown > 0) return "markdown";
  return "none";
}
