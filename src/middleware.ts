import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const normalisedHost = host.trim().toLowerCase().replace(/:[0-9]+$/, "").replace(/\.$/, "");

  // Detect and enforce canonical apex vs www redirect if requested
  // In production, www.dealer.com.au permanent redirects (308) to dealer.com.au (or vice-versa)
  if (normalisedHost.startsWith("www.") && !normalisedHost.includes("localhost")) {
    const canonicalHost = normalisedHost.replace(/^www\./, "");
    const url = request.nextUrl.clone();
    url.host = canonicalHost;
    url.port = "";
    return NextResponse.redirect(url, { status: 308 });
  }

  // Forward normalised host header to Server Components & Route Handlers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-forwarded-host", normalisedHost);
  requestHeaders.set("x-tenant-host", normalisedHost);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
