import { NextResponse }
  from "next/server";

import { createServerClient }
  from "@supabase/ssr";

export async function middleware(req) {

  let response = NextResponse.next();

  const supabase =
    createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,

      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

      {
        cookies: {
          get(name) {
            return req.cookies.get(name)?.value;
          },

          set(name, value, options) {
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },

          remove(name, options) {
            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isDashboard =
    req.nextUrl.pathname.startsWith(
      "/dashboard"
    );

  const isLogin =
    req.nextUrl.pathname.startsWith(
      "/portal"
    );

  if (isDashboard && !user) {
    return NextResponse.redirect(
      new URL("/portal", req.url)
    );
  }

  if (isLogin && user) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/portal",
  ],
};