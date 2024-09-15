import prisma from "@/lib/prisma";
import { decryptSecretaryCookie } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const cookie = req.headers.get('Authorization')?.replace('Bearer ', '')
    const session = await decryptSecretaryCookie(cookie || '')

    if (!session) return NextResponse.json({}, { status: 403 });

    const secretary = await prisma.secretary.findUnique({
        where: {
            id: session.secretary.id
        }
    })

    if (!secretary) return NextResponse.json({}, { status: 403 });

    const stays = await prisma.stay.findMany(
        {
            include: {
                doctor: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
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
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                }

            }
        })

    if (!stays) return NextResponse.json({}, { status: 404 })

    const staysList = stays.map(stay => ({
        id: stay.id,
        patient: stay.patient,
        doctor: stay.doctor,
        reason: stay.reason,
        start: stay.start,
        end: stay.end,
        prescription: stay.prescription
    }))

    return NextResponse.json({ stays: staysList })
}