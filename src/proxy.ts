import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { negotiateAccept } from "@/lib/seo/accept";

const skipNegotiation = new Set([
  "/opengraph-image",
  "/twitter-image",
  "/icon",
  "/apple-icon",
  "/manifest.webmanifest",
]);

function isAppRequest(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  return (
    request.headers.get("RSC") === "1" ||
    request.headers.has("Next-Url") ||
    request.headers.has("Next-Router-Prefetch") ||
    request.headers.has("Next-Router-Segment-Prefetch") ||
    accept.includes("text/x-component")
  );
}

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") return NextResponse.next();
  if (isAppRequest(request)) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (skipNegotiation.has(pathname) || pathname === "/llms.txt") return NextResponse.next();

  const decision = negotiateAccept(request.headers.get("accept"));
  if (decision === "markdown") {
    const url = request.nextUrl.clone();
    url.pathname = "/api/markdown";
    url.search = "";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  if (decision === "none") {
    return new NextResponse("Not Acceptable\n", {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Link", '</llms.txt>; rel="describedby"; type="text/markdown"');
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
