import prisma from "@/_lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { decryptDoctorCookie } from "@/_lib/session";

interface UrlParams {
    id: string
}

const AddOpinionFormSchema = z.object({
    id: z.coerce.number().min(1, 'Identifiant invalide !'),
    title: z.string().min(1, 'Titre invalide !'),
    description: z.string().min(1, 'Description invalide !'),
})

export async function POST(req: NextRequest, { params }: { params: UrlParams }) {
    const cookie = req.headers.get('Authorization')?.replace('Bearer ', '')
    const session = await decryptDoctorCookie(cookie || '')

    if (!session) return NextResponse.json({}, { status: 403 });

    const doctor = await prisma.doctor.findUnique({
        where: {
            id: session.doctor.id
        }
    })

    if (!doctor) return NextResponse.json({}, { status: 403 });

    const validationResult = AddOpinionFormSchema.safeParse({
        ...(await req.json()),
        id: params.id
    })

    if (!validationResult.success) return NextResponse.json({
        errors: validationResult.error.flatten().fieldErrors,
    }, {
        status: 400
    });

    const { id, title, description } = validationResult.data

    const stay = await prisma.stay.findUnique({ where: { id } })

    if (!stay) return NextResponse.json({
    }, {
        status: 404
    });

    await prisma.opinion.create({
        data: {
            title,
            description,
            doctorId: stay.doctorId,
            userId: stay.patientId,
            stayId: stay.id
        }
    })

    const opinions = await prisma.opinion.findMany({
        where: {
            userId: stay.patientId
        },
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
        }
    })

    return NextResponse.json(opinions)
}