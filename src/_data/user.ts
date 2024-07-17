import 'server-only'

import prisma from "@/_lib/db";
import { verifySession } from "@/_lib/session";
import { redirect } from "next/navigation";

export async function getUser() {
    const session = await verifySession()

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
    })

    if (!user) redirect('/auth')

    return user
}