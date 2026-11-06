import { parseLead } from "@/lib/forms";
import { forwardToNexo } from "@/lib/nexo";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const parsed = parseLead(body);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });

  return forwardToNexo(
    request,
    "/api/leads",
    process.env.LEAD_INGEST_SECRET,
    JSON.stringify(parsed.data),
    "application/json",
  );
}
