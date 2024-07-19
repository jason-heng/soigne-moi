import { redirect } from "next/navigation"
import { getUser } from "./users"
import prisma from "@/_lib/db"
import { logout } from "@/_lib/session"

export async function getSecretaries() {
    const user = await getUser()

    if (!user.admin) logout()

    return await prisma.secretary.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        }
    })
}