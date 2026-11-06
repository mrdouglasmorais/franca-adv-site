import { markdownForPath, markdownHeaders } from "@/lib/seo/agent-docs";

export function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") ?? "/";
  const body = markdownForPath(path);
  if (!body) {
    return new Response("# Página não encontrada\n\nEste endereço não faz parte do site.\n", {
      status: 404,
      headers: markdownHeaders,
    });
  }
  return new Response(body, { headers: markdownHeaders });
}
