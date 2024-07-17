import 'server-only'

import prisma from "../_lib/db";
import { verifySession } from "../_lib/session";

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