import { NextResponse } from "next/server";
import type { NextAuthRequest } from "next-auth";

import { auth } from "@/lib/auth";
import { paths } from "@/lib/paths";

function isPublicPath(pathname: string) {
  return pathname.startsWith(paths.auth.root) || pathname === paths.auth.logout;
}

export const proxy = auth(async (req: NextAuthRequest) => {
  const { pathname } = req.nextUrl;

  if (req.auth?.user && pathname.startsWith(paths.auth.root)) {
    return NextResponse.redirect(new URL(paths.dashboard, req.url));
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!req.auth?.user) {
    const login = new URL(paths.auth.login, req.url);
    login.searchParams.set("callbackUrl", `${pathname}${req.nextUrl.search}`);
    return NextResponse.redirect(login);
  }

  if (pathname === paths.root) {
    return NextResponse.redirect(new URL(paths.dashboard, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
