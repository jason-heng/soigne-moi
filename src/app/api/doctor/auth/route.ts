import 'server-only'

import prisma from "@/_lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { encrypt } from "@/_lib/session";

const DoctorLoginFormSchema = z.object({
    registrationNumber: z.coerce.number().min(1, 'Matricule invalide !'),
    password: z.string().min(1, 'Mot de passe invalide !')
})

export async function POST(req: NextRequest) {
    const validationResult = DoctorLoginFormSchema.safeParse(await req.json())

    if (!validationResult.success) return NextResponse.json({
        errors: validationResult.error.flatten().fieldErrors,
    }, {
        status: 400
    });

    const { registrationNumber, password } = validationResult.data

    try {
        const doctor = await prisma.doctor.findUnique({
            where: {
                registrationNumber
            }
        })

        if (!doctor) return NextResponse.json({
            errors: {
                registrationNumber: 'Docteur introuvable !'
            }
        }, {
            status: 400
        });

        const correctPassword = await bcrypt.compare(password, doctor.password)
        if (!correctPassword) return NextResponse.json({
            errors: {
                password: 'Mot de passe incorrect !'
            }
        }, {
            status: 400
        });

        const cookie = await encrypt({
            doctor: {
                id: doctor.id,
                firstName: doctor.firstName
            }
        })

        return NextResponse.json({
            token: cookie
        });
    } catch (error) {
        return NextResponse.json({}, { status: 500 })
    }
}