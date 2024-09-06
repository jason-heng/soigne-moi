import 'server-only';

import { logout } from '@/_lib/actions';
import prisma from "@/_lib/db";
import { verifySession } from "@/_lib/session";
import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';

export async function getUser() {
    const session = await verifySession()

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    })

    if (!user) {
        logout()
        redirect('/auth')
    }

    return user
}

export async function getUsers() {
    const user = await getUser()

    if (!user.admin) logout()

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

export async function countUsers(args?: Prisma.UserCountArgs) {
    const user = await getUser()

    if (!user.admin) logout()

    return await prisma.user.count(args)
}