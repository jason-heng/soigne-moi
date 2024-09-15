import 'server-only'

import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const key = new TextEncoder().encode(process.env.AUTH_SECRET)

export const cookieHelper = {
    name: 'session',
    options: { httpOnly: true, secure: false }
}

export interface UserSession extends JWTPayload {
    user: {
        id: number;
        firstName: string;
        admin: boolean;
    }
}

export interface DoctorSession extends JWTPayload {
    doctor: {
        id: number;
        firstName: string;
    }
}

export interface SecretarySession extends JWTPayload {
    secretary: {
        id: number;
        firstName: string;
    }
}

export async function encrypt(payload: UserSession | DoctorSession | SecretarySession) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(key)
}

export async function decryptUserCookie(cookie: string) {
    try {
        const { payload } = await jwtVerify(cookie, key, {
            algorithms: ['HS256']
        })

        return payload as UserSession
    } catch (error) {
        return null
    }
}

export async function decryptDoctorCookie(cookie: string) {
    try {
        const { payload } = await jwtVerify(cookie, key, {
            algorithms: ['HS256']
        })

        return payload as DoctorSession
    } catch (error) {
        return null
    }
}

export async function decryptSecretaryCookie(cookie: string) {
    try {
        const { payload } = await jwtVerify(cookie, key, {
            algorithms: ['HS256']
        })

        return payload as SecretarySession
    } catch (error) {
        return null
    }
}


export async function createSession(user: { id: number, firstName: string, admin: boolean }) {
    const cookie = await encrypt({ user })
    cookies().set(cookieHelper.name, cookie, { ...cookieHelper.options })
}

export async function getSession() {
    const cookie = cookies().get(cookieHelper.name)?.value
    const session = await decryptUserCookie(cookie || '')

    return session
}

export async function verifySession() {
    const session = await getSession()

    if (!session?.user) redirect('/auth')

    return { user: session.user }
}