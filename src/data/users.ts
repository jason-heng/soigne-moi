import 'server-only';

import { logout } from '@/actions/auth';
import prisma from '@/lib/prisma';
import { deleteSession, verifySession } from "@/lib/session";
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
        deleteSession()
        redirect('/auth')
    }

    return user
}

export async function getUsers() {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

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

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    return await prisma.user.count(args)
}