import { parseApplication } from "@/lib/forms";
import { forwardToNexo } from "@/lib/nexo";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Não foi possível ler o envio." }, { status: 400 });
  }

  const parsed = parseApplication(form);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });

  return forwardToNexo(
    request,
    "/api/candidaturas",
    process.env.JOB_APPLICATION_SECRET,
    parsed.form,
  );
}
