import 'server-only';

import prisma from '@/lib/prisma';
import { deleteSession, verifySession } from "@/lib/session";
import { Prisma } from '@prisma/client';
import { getUser } from './users';
import { redirect } from 'next/navigation';

export async function getDoctors() {
    await verifySession()

    return await prisma.doctor.findMany({
        select: {
            id: true,
            registrationNumber: true,
            firstName: true,
            lastName: true,
            speciality: true,
            worksSunday: true,
            worksMonday: true,
            worksTuesday: true,
            worksWednesday: true,
            worksThursday: true,
            worksFriday: true,
            worksSaturday: true,
        },
        orderBy: {
            id: "asc"
        }
    })
}

export async function getDoctor(doctorId: number) {
    await verifySession()

    return await prisma.doctor.findUnique({
        select: {
            id: true,
            registrationNumber: true,
            firstName: true,
            lastName: true,
            speciality: true,
            worksSunday: true,
            worksMonday: true,
            worksTuesday: true,
            worksWednesday: true,
            worksThursday: true,
            worksFriday: true,
            worksSaturday: true,
        },
        where: {
            id: doctorId,
        }
    })
}

export async function countDoctors(args?: Prisma.DoctorCountArgs) {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect("/auth")
    }

    return await prisma.doctor.count(args)
}