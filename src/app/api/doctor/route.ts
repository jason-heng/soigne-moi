import prisma from "@/_lib/db";
import { decryptDoctorCookie } from "@/_lib/session";
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

    return NextResponse.json({ firstName: doctor.firstName })
}