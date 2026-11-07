import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Redirect explicit /en and /en/* to clean URLs (prevents duplicate content)
  if (pathname === "/en") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "");
    return NextResponse.redirect(url, 308);
  }

  // 2. Security: Sanitize request headers to prevent client-supplied locale spoofing
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("x-locale");

  // 3. For Arabic routes (/ar or /ar/*), allow native routing to app/[locale]/*
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    requestHeaders.set("x-locale", "ar");
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 4. For clean URLs without explicit /ar prefix:
  // If user has active Arabic cookie preference, rewrite to /ar segment
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale === "ar") {
    const url = request.nextUrl.clone();
    url.pathname = `/ar${pathname === "/" ? "" : pathname}`;
    requestHeaders.set("x-locale", "ar");
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 5. Default English clean URLs (/, /about, /projects, /contact, /projects/*),
  // rewrite internally to /en/... so Next.js matches app/[locale]/*
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  requestHeaders.set("x-locale", "en");

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
