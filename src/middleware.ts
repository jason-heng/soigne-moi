import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptUserCookie } from "./lib/session";

export default async function middleware(req: NextRequest) {
    const authRoutes = ['/auth']
    const patientRoutes = ['/patient', '/patient/stays', '/patient/settings']
    const adminRoutes = ['/admin', '/admin/doctors', '/admin/secretaries', '/admin/users', '/admin/settings',]
    const currentPath = req.nextUrl.pathname

    const cookie = cookies().get('session')?.value
    const session = await decryptUserCookie(cookie || '')

    if (authRoutes.includes(currentPath)) {
        if (session) return NextResponse.redirect(new URL(session.user.admin ? '/admin' : '/patient', req.nextUrl));
    }

    if ([...patientRoutes, ...adminRoutes].includes(currentPath)) {
        if (!session?.user) return NextResponse.redirect(new URL('/auth', req.nextUrl));
        if (patientRoutes.includes(currentPath) && session.user.admin) return NextResponse.redirect(new URL('/admin', req.nextUrl));
        if (adminRoutes.includes(currentPath) && !session.user.admin) return NextResponse.redirect(new URL('/patient', req.nextUrl));
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}