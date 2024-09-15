import prisma from "@/lib/prisma";
import { decryptDoctorCookie } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

interface RouteProps {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params }: RouteProps) {
    const cookie = req.headers.get('Authorization')?.replace('Bearer ', '')
    const session = await decryptDoctorCookie(cookie || '')

    if (!session) return NextResponse.json({}, { status: 403 });

    const doctor = await prisma.doctor.findUnique({
        where: {
            id: session.doctor.id
        }
    })

    if (!doctor) return NextResponse.json({}, { status: 403 });

    const stayId = params.id

    const stay = await prisma.stay.findUnique({
        where: {
            id: parseInt(stayId)
        },
        include: {
            prescription: {
                include: {
                    drugs: {
                        select: {
                            id: true,
                            name: true,
                            dosage: true,
                        }
                    }
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    opinions: {
                        select: {
                            id: true,
                            title: true,
                            created: true,
                            description: true,
                            doctor: {
                                select: {
                                    firstName: true,
                                    lastName: true
                                }
                            }
                        },
                    }
                }
            }
        }
    })

    if (!stay) return NextResponse.json({}, { status: 404 })

    return NextResponse.json({
        stay: {
            id: stay.id,
            firstName: stay.patient.firstName,
            lastName: stay.patient.lastName,
            reason: stay.reason,
            start: stay.start,
            end: stay.end,
        },
        prescription: {
            start: stay.prescription?.start,
            end: stay.prescription?.end,
            drugs: stay.prescription?.drugs,
        },
        opinions: stay.patient.opinions
    })
}