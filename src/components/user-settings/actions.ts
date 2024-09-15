"use server"

import { getUser } from "@/data/users";
import prisma from "@/lib/prisma";
import { FormState, fromErrorToFormState, toFormState } from "@/lib/to-form-state";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const EditPasswordFormSchema = z.object({
    newPassword: z.string().min(1, "Nouveau mot de passe requis."),
    repeatNewPassword: z.string(),
    password: z.string()
})

export async function editPassword(state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    try {
        const { newPassword, repeatNewPassword, password } = EditPasswordFormSchema.parse({
            newPassword: formData.get('new-password'),
            repeatNewPassword: formData.get('repeat-new-password'),
            password: formData.get('password'),
        })


        if (newPassword !== repeatNewPassword) return toFormState("ERROR", {
            fieldErrors: {
                repeatNewPassword: ["Nouveaux mots de passe différents !"]
            }
        })

        const correctPassword = await bcrypt.compare(password, user.password)

        if (!correctPassword) return toFormState("ERROR", {
            fieldErrors: {
                password: ["Mot de passe actuel incorrect !"]
            }
        })

        const newHashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: newHashedPassword
            }
        })

        return toFormState("SUCCESS", {
            message: "Mot de passe modifié !",
            reset: true
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }
}

const EditInfoFormSchema = z.object({
    firstName: z.string().min(1, "Prénom invalide !"),
    lastName: z.string().min(1, "Nom invalide !"),
    email: z.string().email("Email invalide !"),
    address: z.string().min(1, "Adresse invalide !"),
})

export async function editInfo(state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    try {
        const data = EditInfoFormSchema.parse({
            firstName: formData.get('first-name'),
            lastName: formData.get('last-name'),
            email: formData.get('email'),
            address: formData.get('address'),
        })
    
        await prisma.user.update({
            where: {
                id: user.id
            },
            data
        })
    
        revalidatePath('/patient', "layout")
    
        return toFormState("SUCCESS", {
            message: "Informations personnelles modifiées !"
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }
}