import prisma from "@/lib/prisma";
import { decryptDoctorCookie } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface UrlParams {
    id: string
}

const EditPrescriptionEndFormSchema = z.object({
    id: z.coerce.number().min(1, 'Identifiant invalide !'),
    end: z.string().datetime("Date de fin invalide !"),
})

export async function PUT(req: NextRequest, { params }: { params: UrlParams }) {
    const cookie = req.headers.get('Authorization')?.replace('Bearer ', '')
    const session = await decryptDoctorCookie(cookie || '')

    if (!session) return NextResponse.json({}, { status: 403 });

    const doctor = await prisma.doctor.findUnique({
        where: {
            id: session.doctor.id
        }
    })

    if (!doctor) return NextResponse.json({}, { status: 403 });

    const validationResult = EditPrescriptionEndFormSchema.safeParse({
        ...(await req.json()),
        id: params.id
    })

    if (!validationResult.success) return NextResponse.json({
        errors: validationResult.error.flatten().fieldErrors,
    }, {
        status: 400
    });

    const { id, end } = validationResult.data

    if (!await prisma.stay.findUnique({ where: { id } })) return NextResponse.json({
    }, {
        status: 404
    });

    await prisma.prescription.update({
        where: {
            stayId: id,
        },
        data: {
            end: new Date(end),
        }
    })

    return NextResponse.json({})
}

const AddDrugFormSchema = z.object({
    id: z.coerce.number().min(1, 'Identifiant invalide !'),
    name: z.string().min(1, 'Nom invalide !'),
    dosage: z.string().min(1, 'Posologie invalide !'),
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

    const validationResult = AddDrugFormSchema.safeParse({
        ...(await req.json()),
        id: params.id
    })

    if (!validationResult.success) return NextResponse.json({
        errors: validationResult.error.flatten().fieldErrors,
    }, {
        status: 400
    });

    const { id, name, dosage } = validationResult.data

    const prescription = await prisma.prescription.findUnique({ where: { stayId: id } })

    if (!prescription) return NextResponse.json({
    }, {
        status: 404
    });

    await prisma.drug.create({
        data: {
            name,
            dosage,
            prescriptionId: prescription.id
        }
    })

    const opinions = await prisma.prescription.findUnique({
        where: {
            stayId: id
        },
        include: {
            drugs: {
                select: {
                    id: true,
                    name: true,
                    dosage: true,
                }
            }
        }
    })

    return NextResponse.json(opinions)
}