function nexoBase() {
  const configured = process.env.FRANCA_ADV_API_URL?.trim();
  return (configured || "https://nexo.grupoferreirafranca.com.br").replace(/\/$/, "");
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "";
  return request.headers.get("x-real-ip")?.trim() ?? "";
}

export async function forwardToNexo(
  request: Request,
  path: "/api/leads" | "/api/candidaturas",
  secret: string | undefined,
  body: BodyInit,
  contentType?: string,
) {
  if (!secret) {
    console.error(`nexo ${path} sem credencial de envio`);
    return Response.json(
      { error: "O envio não foi registrado. Tente de novo em instantes ou fale pelo WhatsApp." },
      { status: 503 },
    );
  }

  const headers = new Headers();
  headers.set("authorization", `Bearer ${secret}`);
  if (contentType) headers.set("content-type", contentType);
  const ip = clientIp(request);
  if (ip) headers.set("x-forwarded-for", ip);

  let response: Response;
  try {
    response = await fetch(`${nexoBase()}${path}`, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { error: "Não foi possível falar com o escritório agora. Tente em instantes." },
      { status: 502 },
    );
  }

  let payload: { error?: string; protocolId?: string } = {};
  try {
    payload = (await response.json()) as { error?: string; protocolId?: string };
  } catch {
    payload = {};
  }

  if (!response.ok) {
    console.error(`nexo ${path} respondeu ${response.status}`);
  }

  if (response.status === 401) {
    return Response.json(
      { error: "O envio não foi registrado. Tente de novo em instantes ou fale pelo WhatsApp." },
      { status: 503 },
    );
  }

  if (!response.ok) {
    return Response.json(
      { error: payload.error ?? "Não foi possível concluir o envio. Tente de novo em instantes." },
      { status: response.status },
    );
  }

  return Response.json({ protocolId: payload.protocolId ?? "" }, { status: 201 });
}
