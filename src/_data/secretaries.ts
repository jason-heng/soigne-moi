import { getUser } from "./users"
import prisma from "@/_lib/db"
import { logout } from "@/_lib/actions"

export async function getSecretaries() {
    const user = await getUser()

    if (!user.admin) logout()

    return await prisma.secretary.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        },
        orderBy: {
            id: "asc"
        }
    })
}