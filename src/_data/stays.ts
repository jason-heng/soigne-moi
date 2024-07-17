"use server"

import { revalidatePath } from "next/cache";
import prisma from "../_lib/db";
import { verifySession } from "../_lib/session";


export async function createStay(data: { reason: string, start: string, end: string, doctorId: number }) {
    const session = await verifySession()

    await prisma.$transaction(async (prisma) => {
        const stay = await prisma.stay.create({ data: { patientId: session.user.id, ...data } });

        const prescription = await prisma.prescription.create({
            data: {
                start: data.start,
                end: data.end,
                stayId: stay.id,
            },
        });

        const updatedStay = await prisma.stay.update({
            where: { id: stay.id },
            data: {
                prescriptionId: prescription.id,
            },
        });

        return updatedStay;
    });

    revalidatePath("/patient")
}

export async function getCurrentStay() {
    const session = await verifySession()

    return await prisma.stay.findFirst({
        where: {
            patientId: session.user.id,
            start: {
                lte: new Date()
            },
            end: {
                gte: new Date()
            }
        },
        include: {
            doctor: true,
            prescription: {
                include: { drugs: true }
            },
        }
    })
}

export async function getIncomingStay() {
    const session = await verifySession()

    return await prisma.stay.findFirst({
        where: {
            patientId: session.user.id,
            start: {
                gt: new Date()
            }
        },
        include: { doctor: true }
    })
}

export async function getStays() {
    const session = await verifySession()

    return await prisma.stay.findMany({
        where: {
            patientId: session.user.id,
        },
        include: {
            doctor: true,
            prescription: {
                include: { drugs: true }
            },
        }
    })
}