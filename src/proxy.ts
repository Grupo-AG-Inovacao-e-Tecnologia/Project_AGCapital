import { auth } from "@/lib/auth";
import { paths } from "@/lib/paths";

export const proxy = auth((req) => {
  if (
    !req.auth &&
    req.nextUrl.pathname !== paths.auth.login &&
    // req.nextUrl.pathname !== paths.auth.signup &&
    req.nextUrl.pathname !== paths.auth.loginLink
  ) {
    const newUrl = new URL(paths.auth.login, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
