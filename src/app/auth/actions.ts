"use server"

import prisma from "@/_lib/db"
import { createSession } from "@/_lib/session"
import { FormState, fromErrorToFormState, toFormState } from "@/_lib/to-form-state"
import bcrypt from "bcrypt"
import { z } from "zod"

const SignupFormSchema = z.object({
    firstName: z.string().min(1, "Prénom invalide !"),
    lastName: z.string().min(1, "Nom invalide !"),
    address: z.string().min(1, "Adresse invalide !"),
    email: z.string().email("Email invalide !"),
    password: z.string().min(1, "Mot de passe invalide !"),
    repeatPassword: z.string()
})

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    try {
        const { firstName, lastName, address, email, password, repeatPassword } = SignupFormSchema.parse({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            repeatPassword: formData.get('repeatPassword'),
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
    
        await createSession({ id: user.id, firstName: user.firstName, admin: false }, '/patient')

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

        await createSession({ id: user.id, firstName: user.firstName, admin: user.admin }, user.admin ? '/admin' : '/patient')

        return toFormState("SUCCESS", {
            message: "Connecté !",
            redirect: user.admin ? '/admin' : '/patient'
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }
}