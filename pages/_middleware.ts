import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
    const session = await getToken({
        req,
        secret: process.env.JWT_SECRET
    });
    const { pathname, origin } = req.nextUrl;
    if (!pathname.includes("/api")) {
        if (session) {
            if (pathname !== '/new' && !session.user.name) {
                return NextResponse.redirect(`${origin}/new`);
            }
            // TODO: check if user has subscription except for admin
            // if (pathname !== '/new') {
            //     return;
            // }
        }
    }
    return NextResponse.next();
}