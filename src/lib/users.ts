"use server"

import prisma from "./db"
import bcrypt from "bcrypt"

export async function getUser(userId: number) {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
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