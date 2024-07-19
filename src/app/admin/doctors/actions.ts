"use server"

import prisma from "@/_lib/db"
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function doctorAdd(firstName: string, lastName: string, speciality: string, registrationNumber: number, password: string) {
    const registrationNumberUsed = await prisma.doctor.count({
        where: {
            registrationNumber
        }
    })

    if (registrationNumberUsed) {
        throw new Error("Matricule déja utilisé !")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newDoctor = {
        registrationNumber,
        firstName,
        lastName,
        speciality,
        password: hashedPassword,
    }

    await prisma.doctor.create({
        data: newDoctor
    })

    revalidatePath("/admin/doctors")
}

export async function setTimeTable(doctorId: number, worksSunday: boolean, worksMonday: boolean, worksTuesday: boolean, worksWednesday: boolean, worksThursday: boolean, worksFriday: boolean, worksSaturday: boolean) {
    await prisma.doctor.update({
        where: { id: doctorId },
        data: {
            worksSunday,
            worksMonday,
            worksTuesday,
            worksWednesday,
            worksThursday,
            worksFriday,
            worksSaturday,
        },
    })
    revalidatePath('/admin/doctors')
}

export async function deleteDoctor(doctorId: number) {
    await prisma.doctor.delete({
        where: { id: doctorId },
    })
    revalidatePath('/admin/doctors')
}

export async function editDoctorPassword(doctorId: number) {
    return
}

