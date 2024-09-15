import prisma from "@/lib/prisma";
import { decryptDoctorCookie } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const cookie = req.headers.get('Authorization')?.replace('Bearer ', '')
    const session = await decryptDoctorCookie(cookie || '')

    if (!session) return NextResponse.json({}, { status: 403 });

    const doctor = await prisma.doctor.findUnique({
        where: {
            id: session.doctor.id
        }
    })

    if (!doctor) return NextResponse.json({}, { status: 403 });

    const stays = await prisma.stay.findMany({
        where: {
            doctorId: session.doctor.id,
            start: {
                lte: new Date()
            },
            end: {
                gte: new Date()
            },
        },
        include: {
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            }
        }
    })

    return NextResponse.json(stays.map(stay => ({ id: stay.id, firstName: stay.patient.firstName, lastName: stay.patient.lastName, start: stay.start, end: stay.end, reason: stay.reason })))
}