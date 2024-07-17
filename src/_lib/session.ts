import 'server-only'

import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.AUTH_SECRET)

const cookieHelper = {
    name: 'session',
    options: { httpOnly: true, secure: true },
    duration: 1000 * 60 * 60 * 24 // 24 heures
}

interface Session extends JWTPayload {
    user: {
        id: number;
        firstName: string;
        admin: boolean;
    }
}

export async function encrypt(payload: Session) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key)
}

export async function decrypt(cookie: string) {
    try {
        const { payload } = await jwtVerify(cookie, key, {
            algorithms: ['HS256']
        })

        return payload as Session
    } catch (error) {
        return null
    }
}


export async function createSession(user: { id: number, firstName: string, admin: boolean }, redirectUrl: string) {
    const expires = new Date(Date.now() + cookieHelper.duration)
    const cookie = await encrypt({ user, expires })

    cookies().set(cookieHelper.name, cookie, { ...cookieHelper.options, expires })
    redirect(redirectUrl)
}

export async function verifySession() {
    const cookie = cookies().get(cookieHelper.name)?.value
    const session = await decrypt(cookie || '')

    if (!session?.user) redirect('/auth')

    return { user: session.user }
}

export async function deleteSession() {
    "use server"

    cookies().delete(cookieHelper.name)
    redirect('/auth')
}