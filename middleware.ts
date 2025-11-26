import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Only process admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("admin-session");

    // If accessing /admin (login page) and already authenticated, redirect to dashboard
    if (
      request.nextUrl.pathname === "/admin" &&
      adminSession?.value === "authenticated"
    ) {
      return NextResponse.redirect(new URL("/admin/reda", request.url));
    }

    // If accessing /admin (login page), allow access
    if (request.nextUrl.pathname === "/admin") {
      return NextResponse.next();
    }

    // For all other admin routes (/admin/reda, /admin/reda/*), require authentication
    if (!adminSession || adminSession.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
