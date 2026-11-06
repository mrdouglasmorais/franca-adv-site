import { llmsTxt, markdownHeaders } from "@/lib/seo/agent-docs";

export function GET() {
  return new Response(llmsTxt(), { headers: markdownHeaders });
}
