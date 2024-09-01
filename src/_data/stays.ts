import 'server-only'

import prisma from "../_lib/db";
import { verifySession } from "../_lib/session";

export async function getStays() {
    const session = await verifySession()

    return await prisma.stay.findMany({
        where: {
            patientId: session.user.id,
        },
        include: {
            doctor: true,
            prescription: {
                include: { drugs: true }
            }
        },
        orderBy: {
            id: "asc"
        }
    })
}