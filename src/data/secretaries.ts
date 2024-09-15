import { logout } from "@/actions/auth"
import prisma from "@/lib/prisma"
import { deleteSession } from "@/lib/session"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"
import { getUser } from "./users"

export async function getSecretaries() {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

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

export async function countSecretaries(args?: Prisma.SecretaryCountArgs) {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    return await prisma.secretary.count(args)
}