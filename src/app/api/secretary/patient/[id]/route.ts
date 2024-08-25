import prisma from "@/_lib/db";
import { decryptSecretaryCookie } from "@/_lib/session";
import { NextRequest, NextResponse } from "next/server";

interface UrlParams {
    id: string
}

export async function GET(req: NextRequest, { params }: { params: UrlParams }) {
    const cookie = req.headers.get('Authorization')?.replace('Bearer ', '')
    const session = await decryptSecretaryCookie(cookie || '')

    if (!session) return NextResponse.json({}, { status: 403 });

    const patientId = params.id

    const patient = await prisma.user.findUnique({
        where: {
            id: parseInt(patientId)
        },
        include: {
            stays: {
                select: {
                    id: true,
                    start: true,
                    end: true,
                    doctor: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    },
                    doctorId: true,
                    reason: true,
                    prescription: {
                        select: {
                            start: true,
                            end: true,
                            drugs: {
                                select: {
                                    name: true,
                                    dosage: true
                                }
                            }
                        }
                    },
                    prescriptionId: true

                }
            },
            opinions: {
                select: {
                    doctor: true,
                    stayId: true,
                    title: true,
                    description: true,
                    created: true,
                    userId: true,
                }
            },
        }
    })

    if (!patient) return NextResponse.json({}, { status: 404 })
    return NextResponse.json({
        patient: {
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            stays: patient.stays,
            opinions: patient.opinions
        },
    })
}