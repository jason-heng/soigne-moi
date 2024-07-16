import prisma from "../_lib/db";
import { verifySession } from "../_lib/session";

export async function getDoctors() {
    await verifySession()

    return await prisma.doctor.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            speciality: true,
        }
    })
}