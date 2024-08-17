import 'server-only'

import prisma from "@/_lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { encrypt } from "@/_lib/session";

const SecretaryLoginFormSchema = z.object({
    email: z.string().email('Email invalide !'),
    password: z.string().min(1, 'Mot de passe invalide !')
})

export async function POST(req: NextRequest) {
    const validationResult = SecretaryLoginFormSchema.safeParse(await req.json())

    if (!validationResult.success) return NextResponse.json({
        errors: validationResult.error.flatten().fieldErrors,
    }, {
        status: 400
    });

    const { email, password } = validationResult.data

    try {
        const secretary = await prisma.secretary.findUnique({
            where: {
                email
            },
        })

        if (!secretary) return NextResponse.json({
            errors: {
                email: 'Secrétaire introuvable !'
            }
        }, {
            status: 404
        });

        const correctPassword = await bcrypt.compare(password, secretary.password)
        if (!correctPassword) return NextResponse.json({
            errors: {
                password: 'Mot de passe incorrect !'
            }
        }, {
            status: 400
        });

        const cookie = await encrypt({
            secretary: {
                id: secretary.id,
                firstName: secretary.firstName
            }
        })
        const secretrayInfo = { id: secretary.id, firstName: secretary.firstName, lastName: secretary.lastName }

        return NextResponse.json({
            token: cookie,
            secretary: secretrayInfo

        });
    } catch (error) {
        return NextResponse.json({}, { status: 500 })
    }
}