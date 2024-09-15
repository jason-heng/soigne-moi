import 'server-only';

import prisma from '@/lib/prisma';
import { deleteSession, verifySession } from '@/lib/session';
import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getUser } from './users';

export async function getMyStays() {
    const session = await verifySession()

    return await prisma.stay.findMany({
        where: {
            patientId: session.user.id,
        },
        include: {
            doctor: true,
            prescription: {
                include: { drugs: true }
            }
        },
        orderBy: {
            id: "asc"
        }
    })
}

export async function getStays(args?: Prisma.StayFindManyArgs) {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    return await prisma.stay.findMany(args)
}