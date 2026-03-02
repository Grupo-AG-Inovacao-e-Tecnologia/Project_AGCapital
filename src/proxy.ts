import { auth } from "@/lib/auth";
import { path } from "@/lib/path";

export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== path.auth.login) {
    const newUrl = new URL(path.auth.login, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
