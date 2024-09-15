"use server"

import { getUser } from "@/data/users";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const EditPasswordFormSchema = z.object({
    newPassword: z.string().min(1, "Mot de passe invalide !"),
    repeatNewPassword: z.string(),
    password: z.string()
})

export async function editPassword(_: any, formData: FormData) {
    const user = await getUser()

    const validationResult = EditPasswordFormSchema.safeParse({
        newPassword: formData.get('new-password'),
        repeatNewPassword: formData.get('repeat-new-password'),
        password: formData.get('password'),
    })

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const { newPassword, repeatNewPassword, password } = validationResult.data

    if (newPassword !== repeatNewPassword) return {
        errors: {
            newPassword: undefined,
            repeatNewPassword: "Mot de passes differents !",
            password: undefined,
        }
    }

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) return {
        errors: {
            newPassword: undefined,
            repeatNewPassword: undefined,
            password: "Mot de passe incorrect !"
        }
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            password: newHashedPassword
        }
    })

    return {
        success: true
    }
}

const EditInfoFormSchema = z.object({
    firstName: z.string().min(1, "Prénom invalide !"),
    lastName: z.string().min(1, "Nom invalide !"),
    email: z.string().email("Email invalide !"),
    address: z.string().min(1, "Adresse invalide !"),
})

export async function editInfo(_: any, formData: FormData) {
    const user = await getUser()

    const validationResult = EditInfoFormSchema.safeParse({
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        address: formData.get('address'),
    })

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const { firstName, lastName, email, address } = validationResult.data

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            firstName,
            lastName,
            email,
            address
        }
    })

    revalidatePath('/patient/settings')

    return {
        success: true
    }
}