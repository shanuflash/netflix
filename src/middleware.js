import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // if (
  //   !session &&
  //   (pathname === "/" ||
  //     pathname === "/details" ||
  //     pathname === "/preview" ||
  //     pathname === "/history")
  // ) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  return res;
  // if (!session && pathname !== "/login") {
  //   return NextResponse.redirect("localhost:3000/login");
  // }
}
