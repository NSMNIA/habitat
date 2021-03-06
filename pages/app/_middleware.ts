import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
    const session: any = await getToken({
        req,
        secret: process.env.JWT_SECRET
    });
    const { pathname, origin } = req.nextUrl;
    if (!session) return NextResponse.rewrite(`${origin}/`);
    if (!session?.user?.name) return NextResponse.rewrite(`${origin}/new`);
    return NextResponse.next();
}