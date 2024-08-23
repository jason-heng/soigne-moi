import prisma from "@/_lib/db";
import { decryptSecretaryCookie } from "@/_lib/session";
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

    const patients = await prisma.user.findMany({
        where: {
            admin: false
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

    if (!patients) return NextResponse.json({}, { status: 404 })

    const patientsList = patients.map(patient => ({
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        stays: patient.stays,
        opinions: patient.opinions
    }))

    return NextResponse.json({ patients: patientsList })
}