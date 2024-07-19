"use server"

import { getUser } from "@/_data/users";
import prisma from "@/_lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt"
import { logout } from "@/_lib/session";

const NewSecretaryFormSchema = z.object({
    lastName: z.string().min(1, "Nom invalide !"),
    firstName: z.string().min(1, "Prénom invalide !"),
    email: z.string().email("Email invalide !"),
    password: z.string().min(1, "Mot de passe invalide !")
});

export async function addSecretary(_: any, formData: FormData) {
    const user = await getUser()
    if (!user.admin) logout()

    const validationResult = NewSecretaryFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validationResult.success) return { errors: validationResult.error.flatten().fieldErrors }

    const { firstName, lastName, email, password } = validationResult.data

    if (await prisma.secretary.findUnique({
        where: { email }
    })) return {
        errors: {
            firstName: undefined,
            lastName: undefined,
            email: 'Email déja utilisé !',
            password: undefined,
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.secretary.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword
        }
    })

    revalidatePath("/admin/secretaries")

    return {
        success: true
    }
}

export async function removeSecretary(_: any, id: number) {
    const user = await getUser()
    if (!user.admin) logout()

    await prisma.secretary.delete({
        where: {
            id
        }
    })

    revalidatePath('/admin/secretaries')

    return { success: true }
}

export async function editSecretaryPassword(_: any, formData: FormData) {

}