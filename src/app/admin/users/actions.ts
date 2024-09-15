"use server"

import { getUser } from "@/data/users";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function setAdmin(userId: number, value: boolean) {
    const user = await getUser()

    if (user?.id === userId) return

    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            admin: value
        }
    })

    revalidatePath('/admin/users')
}