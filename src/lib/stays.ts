"use server"

import { revalidatePath } from "next/cache";
import prisma from "./db";


export async function createStay(data: { patientId: number, reason: string, start: string, end: string, doctorId: number }) {
        await prisma.$transaction(async (prisma) => {
            // Step 1: Create the stay without the prescriptionId
            const stay = await prisma.stay.create({
                data
            });

            // Step 2: Create the prescription with the stayId
            const prescription = await prisma.prescription.create({
                data: {
                    start: data.start,
                    end: data.end,
                    stayId: stay.id, // link the prescription to the stay
                },
            });

            // Step 3: Update the stay with the prescriptionId
            const updatedStay = await prisma.stay.update({
                where: { id: stay.id },
                data: {
                    prescriptionId: prescription.id,
                },
            });

            return updatedStay;
        });

    revalidatePath("/dashboard")
}

export async function getCurrentStay(userId: number) {
    return await prisma.stay.findFirst({
        where: {
            patientId: userId,
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

export async function getIncomingStay(userId: number) {
    return await prisma.stay.findFirst({
        where: {
            patientId: userId,
            start: {
                gt: new Date()
            }
        },
        include: { doctor: true }
    })
}

export async function getStays(userId: number) {
    return await prisma.stay.findMany({
        where: {
            patientId: userId,
        },
        include: {
            doctor: true,
            prescription: {
                include: { drugs: true }
            },
        }
    })
}