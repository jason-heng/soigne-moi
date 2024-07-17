"use server"

import { z } from "zod"
import bcrypt from "bcrypt"
import prisma from "@/_lib/db"
import { createSession } from "@/_lib/session"

const SignupFormSchema = z.object({
    firstName: z.string().min(1, "Prénom invalide !"),
    lastName: z.string().min(1, "Nom invalide !"),
    address: z.string().min(1, "Adresse invalide !"),
    email: z.string().email("Email invalide !"),
    password: z.string().min(1, "Mot de passe invalide !"),
    repeatPassword: z.string()
})

export async function signup(_: any, formData: FormData) {
    const validationResult = SignupFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        address: formData.get('address'),
        email: formData.get('email'),
        password: formData.get('password'),
        repeatPassword: formData.get('repeatPassword'),
    })

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }
    
    const { firstName, lastName, address, email, password, repeatPassword } = validationResult.data

    if (password !== repeatPassword) return {
        errors: {
            firstName: undefined,
            lastName: undefined,
            address: undefined,
            email: undefined,
            password: undefined,
            repeatPassword: "Mot de passes differents !",
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            address,
            email,
            password: hashedPassword
        }
    })

    await createSession({ id: user.id, firstName: user.firstName, admin: false }, '/patient')
}

const LoginFormSchema = z.object({
    email: z.string().email("Email invalide !"),
    password: z.string().min(1, "Mot de passe invalide !")
})

export async function login(_: any, formData: FormData) {
    const validationResult = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const { email, password } = validationResult.data

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) return {
        errors: {
            email: "Utilisateur introuvable !",
            password: undefined
        }
    }

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) return {
        errors: {
            email: undefined,
            password: "Mot de passe incorrect !"
        }
    }

    await createSession({ id: user.id, firstName: user.firstName, admin: user.admin }, user.admin ? '/admin' : '/patient')
}