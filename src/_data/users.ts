import 'server-only';

import prisma from "@/_lib/db";
import { verifySession } from "@/_lib/session";
import { logout } from '@/_lib/actions';

export async function getUser() {
    const session = await verifySession()

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    })

    if (!user) logout()

    return user
}

export async function getUsers() {
    const user = await getUser()

    if (!user?.admin) logout()

    return await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            address: true,
            admin: true,
        },
        orderBy: {
            id: "asc"
        }
    })
}