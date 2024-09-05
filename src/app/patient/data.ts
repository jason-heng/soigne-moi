import prisma from "@/_lib/db"
import { verifySession } from "@/_lib/session"
import { formatDate, parseDate, WeekDay } from "@/_lib/utils"

export type CurrentStay = Awaited<ReturnType<typeof getCurrentStay>>

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
        select: {
            start: true,
            end: true,
            reason: true,
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    speciality: true
                }
            },
            prescription: {
                select: {
                    start: true,
                    end: true,
                    drugs: {
                        select: {
                            id: true,
                            name: true,
                            dosage: true
                        }
                    }
                }
            },
        }
    })
}

export type IncomingStay = Awaited<ReturnType<typeof getIncomingStay>>

export async function getIncomingStay() {
    const session = await verifySession()

    return await prisma.stay.findFirst({
        where: {
            patientId: session.user.id,
            start: {
                gt: new Date()
            }
        },
        select: {
            start: true,
            end: true,
            reason: true,
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    speciality: true
                }
            }
        },
        orderBy: {
            id: "asc"
        }
    })
}

function calculateOverbookedDates(stays: { start: Date, end: Date }[]) {
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

export type Doctor = Awaited<ReturnType<typeof getDoctors>>[0]

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