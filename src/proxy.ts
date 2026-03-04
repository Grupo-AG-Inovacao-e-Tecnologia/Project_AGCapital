import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { paths } from "@/lib/paths";

export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== paths.auth.login) {
    const newUrl = new URL(paths.auth.login, req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|[^/]*\\.(?:png|jpe?g|gif|svg|ico|webp)$).*)",
  ],
};
