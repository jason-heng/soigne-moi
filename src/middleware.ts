import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./_lib/session";

export default async function middleware(req: NextRequest) {
    const authRoutes = ['/auth']
    const patientRoutes = ['/patient', '/patient/stays', '/patient/settings']
    const adminRoutes = ['/admin', '/admin/doctors', '/admin/secretaries', '/admin/users', '/admin/settings',]
    const currentPath = req.nextUrl.pathname

    if (authRoutes.includes(currentPath)) {
        const cookie = cookies().get('session')?.value
        const session = await decrypt(cookie || '')

        if (session?.user) return NextResponse.redirect(new URL(session.user.admin ? '/admin' : '/patient', req.nextUrl));
    }

    if ([...patientRoutes, ...adminRoutes].includes(currentPath)) {
        const cookie = cookies().get('session')?.value
        const session = await decrypt(cookie || '')

        if (!session?.user) return NextResponse.redirect(new URL('/auth', req.nextUrl));
        if (patientRoutes.includes(currentPath) && session.user.admin) return NextResponse.redirect(new URL('/admin', req.nextUrl));
        if (adminRoutes.includes(currentPath) && !session.user.admin) return NextResponse.redirect(new URL('/patient', req.nextUrl));
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image).*)']
}