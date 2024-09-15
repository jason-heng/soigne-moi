"use server"

import { getUser } from "@/data/users";
import prisma from "@/lib/prisma";
import { deleteSession } from "@/lib/session";
import { FormState, fromErrorToFormState, toFormState } from "@/lib/to-form-state";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function setAdmin(userId: number, admin: boolean, state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    if (user?.id === userId) return toFormState("ERROR", {
        message: "Vous ne pouvez pas changer votre role !"
    })

    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                admin
            }
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }

    revalidatePath('/admin/users')

    return toFormState("SUCCESS", {
        message: admin ? "L'utilisateur est devenu un administrateur !" : "L'utilisateur n'est plus un administrateur !"
    })
}