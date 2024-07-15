"use server"

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose"
import { NextRequest, NextResponse } from "next/server";
import prisma from "./db";
import bcrypt from "bcrypt";
import { env } from "./config";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(env.AUTH_SECRET)

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30 min from now')
        .sign(key)
}

export async function decrypt(input: string) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    })

    return payload
}

export async function getSession() {
    const session = cookies().get("session")?.value
    if (!session) return null
    return await decrypt(session)
}

export interface SessionUser {
    id: number
    firstName: string
    lastName: string
    isAdmin: boolean
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) throw new Error("Utilisateur introuvable !")

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) throw new Error("Mot de passe incorrect !")

    const expires = new Date(Date.now() + (1e3 * 60 * 30))
    const session = await encrypt({
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin
        }, expires
    })

    cookies().set('session', session, { expires, httpOnly: true })
}

export async function signup(firstName: string, lastName: string, email: string, address: string, password: string) {
    const emailUsed = await prisma.user.count({
        where: {
            email
        }
    })

    if (emailUsed) {
        throw new Error("Email déja utilisé !")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address
    }

    await prisma.user.create({
        data: newUser
    })
}

export async function logout() {
    cookies().set('session', '', { expires: new Date(0) })
    redirect("/auth")
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value
    if (!session) return

    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + (1e3 * 60 * 30))

    const res = NextResponse.next()

    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires as Date
    })

    return res
}