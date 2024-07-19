import 'server-only'

import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.AUTH_SECRET)

export const cookieHelper = {
    name: 'session',
    options: { httpOnly: true, secure: true }
}

interface UserSession extends JWTPayload {
    user: {
        id: number;
        firstName: string;
        admin: boolean;
    }
}

interface DoctorSession extends JWTPayload {
    doctor: {
        id: number;
        firstName: string;
    }
}

export async function encrypt(payload: UserSession | DoctorSession) {
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


export async function createSession(user: { id: number, firstName: string, admin: boolean }, redirectUrl: string) {
    const cookie = await encrypt({ user })

    cookies().set(cookieHelper.name, cookie, { ...cookieHelper.options })
    redirect(redirectUrl)
}

export async function verifySession() {
    const cookie = cookies().get(cookieHelper.name)?.value
    const session = await decryptUserCookie(cookie || '')

    if (!session?.user) redirect('/auth')

    return { user: session.user }
}

export async function deleteSession() {
    cookies().delete(cookieHelper.name)
}

export async function logout() {
    "use server"

    deleteSession()
    redirect('/auth')
}