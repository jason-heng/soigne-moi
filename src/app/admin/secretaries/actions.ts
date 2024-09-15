"use server"

import { getUser } from "@/data/users";
import prisma from "@/lib/prisma";
import { deleteSession } from "@/lib/session";
import { FormState, fromErrorToFormState, toFormState } from "@/lib/to-form-state";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const NewSecretaryFormSchema = z.object({
    lastName: z.string().min(1, "Nom requis."),
    firstName: z.string().min(1, "Prénom requis."),
    email: z.string().email("Email invalide."),
    password: z.string().min(1, "Mot de passe requis.")
});

export async function addSecretary(state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    try {
        const { firstName, lastName, email, password } = NewSecretaryFormSchema.parse({
            firstName: formData.get('first-name'),
            lastName: formData.get('last-name'),
            email: formData.get('email'),
            password: formData.get('password'),
        })

        const emailUsed = await prisma.secretary.findUnique({ where: { email } })

        if (emailUsed) return toFormState("ERROR", {
            fieldErrors: {
                email: ['Email déja utilisé !'],
            }
        })

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.secretary.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }

    revalidatePath("/admin/secretaries")

    return toFormState("SUCCESS", {
        message: "Secrétaire ajoutée !",
        reset: true
    })
}

export async function removeSecretary(secretaryId: number, state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    try {
        await prisma.secretary.delete({ where: { id: secretaryId } })
    } catch (error) {
        return fromErrorToFormState(error)
    }

    revalidatePath('/admin/secretaries')

    return toFormState("SUCCESS", {
        message: "Secrétaire retiré !"
    })
}

const EditSecretaryPasswordFormSchema = z.object({
    password: z.string().min(1, "Mot de passe invalide !"),
})

export async function editSecretaryPassword(secretaryId: number, state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    try {
        const { password } = EditSecretaryPasswordFormSchema.parse({
            password: formData.get('password'),
        });

        const secretaryExists = await prisma.secretary.count({ where: { id: secretaryId } })

        if (!secretaryExists) return toFormState("ERROR", {
            message: "Secrétaire introuvable !"
        })

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.secretary.update({
            where: { id: secretaryId },
            data: { password: hashedPassword },
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }

    revalidatePath("/admin/secretaries")

    return toFormState("SUCCESS", {
        message: "Mot de passe modifié !"
    })
}