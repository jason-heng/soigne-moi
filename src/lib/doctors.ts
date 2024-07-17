"use server"

import prisma from "./db";

export async function getDoctors() {
    return await prisma.doctor.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            speciality: true,
            password : true,
            registrationNumber : true,
        }
    })
}