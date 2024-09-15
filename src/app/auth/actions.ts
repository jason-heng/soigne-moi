"use server"

import prisma from "@/_lib/db"
import { createSession } from "@/_lib/session"
import { FormState, fromErrorToFormState, toFormState } from "@/_lib/to-form-state"
import bcrypt from "bcrypt"
import { z } from "zod"

const SignupFormSchema = z.object({
    firstName: z.string({ required_error: "Prénom requis."}).min(1, "Prénom requis."),
    lastName: z.string({ required_error: "Nom requis."}).min(1, "Nom requis."),
    address: z.string({ required_error: "Adresse requis."}).min(1, "Adresse requis."),
    email: z.string({ required_error: "Email requis."}).email("Email requis."),
    password: z.string({ required_error: "Mot de passe requis."}).min(1, "Mot de passe requis."),
    repeatPassword: z.string({ required_error: "Confirmation de mot de passe requise." })
})

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    try {
        const { firstName, lastName, address, email, password, repeatPassword } = SignupFormSchema.parse({
            firstName: formData.get('first-name'),
            lastName: formData.get('last-name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            repeatPassword: formData.get('repeat-password'),
        })

        if (password !== repeatPassword) return toFormState("ERROR", {
            fieldErrors: {
                repeatPassword: ["Mot de passes differents !"]
            }
        })

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

        await createSession({ id: user.id, firstName: user.firstName, admin: false })

        return toFormState("SUCCESS", {
            message: "Compte crée !",
            redirect: "/patient"
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }
}

const LoginFormSchema = z.object({
    email: z.string({ required_error: "Email requis." }).email("Email invalide."),
    password: z.string({ required_error: "Mot de passe requis." }).min(1, "Mot de passe requis.")
})

export async function login(state: FormState, formData: FormData): Promise<FormState> {
    try {
        const { email, password } = LoginFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        })

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) return toFormState("ERROR", {
            fieldErrors: {
                email: ["Utilisateur introuvable !"]
            }
        })

        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) return toFormState("ERROR", {
            fieldErrors: {
                password: ["Mot de passe incorrect !"]
            }
        })

        await createSession({ id: user.id, firstName: user.firstName, admin: user.admin })

        return toFormState("SUCCESS", {
            message: "Connecté !",
            redirect: user.admin ? '/admin' : '/patient'
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }
}