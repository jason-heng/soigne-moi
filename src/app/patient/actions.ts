"use server"

import { getUser } from "@/_data/users";
import prisma from "@/_lib/db";
import { verifySession } from "@/_lib/session";
import { formatDate, parseDate, WeekDay } from "@/_lib/utils";
import { Stay } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";


function calculateOverbookedDates(stays: Pick<Stay, 'start' | 'end'>[]) {
    const dates: Record<string, number> = {}

    for (const stay of stays) {
        for (var day = stay.start; day <= stay.end; day.setDate(day.getDate() + 1)) {
            if (dates[formatDate(day)]) {
                dates[formatDate(day)]++
            } else {
                dates[formatDate(day)] = 1
            }
        }
    }

    const overbookedDates = []

    for (const day in dates) {
        if (dates[day] >= 5) {
            overbookedDates.push(parseDate(day))
        }
    }

    return overbookedDates
}

export async function getDoctors() {
    await verifySession()

    const doctors = await prisma.doctor.findMany({
        select: {
            id: true,
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
            stays: {
                where: {
                    end: { gte: new Date() }
                },
                select: {
                    start: true,
                    end: true
                }
            }
        },
        orderBy: {
            id: "asc"
        }
    })

    const parsedDoctors = doctors.map(doctor => {
        const overbookedDates = calculateOverbookedDates(doctor.stays)

        const workingDays: WeekDay[] = []

        if (doctor?.worksSunday) workingDays.push("Sunday");
        if (doctor?.worksMonday) workingDays.push("Monday");
        if (doctor?.worksTuesday) workingDays.push("Tuesday");
        if (doctor?.worksWednesday) workingDays.push("Wednesday");
        if (doctor?.worksThursday) workingDays.push("Thursday");
        if (doctor?.worksFriday) workingDays.push("Friday");
        if (doctor?.worksSaturday) workingDays.push("Saturday");

        return {
            id: doctor.id,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            speciality: doctor.speciality,
            workingDays,
            overbookedDates
        }
    })

    return parsedDoctors
}

const NewStayFormSchema = z.object({
    reason: z.string().min(1, "Motif invalide !"),
    start: z.string().datetime("Date de début invalide !"),
    end: z.string().datetime("Date de fin invalide !"),
    doctorId: z.coerce.number().min(1, 'Docteur invalide !'),
});

export async function createStay(_: any, formData: FormData) {
    const user = await getUser()

    const validationResult = NewStayFormSchema.safeParse({
        reason: formData.get('reason'),
        start: formData.get('start'),
        end: formData.get('end'),
        doctorId: formData.get('doctor-id'),
    })

    if (!validationResult.success) return {
        errors: { start: formData.get('start') === formData.get('end') ? "Durée invalide !" : undefined, ...validationResult.error.flatten().fieldErrors }
    }

    const { reason, start, end, doctorId } = validationResult.data

    await prisma.$transaction(async (prisma) => {
        const stay = await prisma.stay.create({
            data: {
                patientId: user.id,
                doctorId,
                reason,
                start,
                end
            }
        });

        const prescription = await prisma.prescription.create({
            data: {
                start,
                end,
                stayId: stay.id,
            },
        });

        await prisma.stay.update({
            where: { id: stay.id },
            data: {
                prescriptionId: prescription.id,
            },
        });
    });

    revalidatePath("/patient")

    return {
        success: true
    }
}