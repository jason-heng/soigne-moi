"use server"

import prisma from "@/_lib/db";
import { verifySession } from "@/_lib/session";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";

export async function getUser() {
    const session = await verifySession()

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
    })

    if (!user) redirect('/auth')

    return user
}

export async function editPassword(userId: number, newPassword: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) throw new Error("Utilisateur introuvable !");

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) throw new Error("Mot de passe incorrect !")

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: hashedPassword
        }
    })
}

export async function editInfos(userId: number, firstName: string, lastName: string, email: string, address: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) throw new Error("Utilisateur introuvable !");


    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            firstName,
            lastName,
            email,
            address,
        }
    })
}