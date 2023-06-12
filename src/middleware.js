import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (
    !session &&
    (pathname === "/" ||
      pathname === "/search" ||
      pathname === "/activity" ||
      pathname === "/genre" ||
      pathname === "/account")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return res;
}
