"use server"

import { getUser } from "@/data/users";
import prisma from "@/lib/prisma";
import { deleteSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const AddDoctorFormSchema = z.object({
    firstName: z.string().min(1, "Prénom invalide !"),
    lastName: z.string().min(1, "Nom invalide !"),
    speciality: z.string().min(1, "Spécialité invalide !"),
    registrationNumber: z.coerce.number().min(1, "Matricule invalide !"),
    password: z.string().min(1, "Mot de passe invalide !"),
});

export async function addDoctor(_: any, formData: FormData) {
    const user = await getUser()
    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    const validationResult = AddDoctorFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        speciality: formData.get('speciality'),
        registrationNumber: formData.get('registrationNumber'),
        password: formData.get('password'),
    });

    if (!validationResult.success) return {
        errors: validationResult.error.flatten().fieldErrors
    }

    const { firstName, lastName, speciality, registrationNumber, password } = validationResult.data

    const registrationNumberUsed = await prisma.doctor.count({
        where: {
            registrationNumber
        }
    })

    if (registrationNumberUsed) return {
        errors: {
            firstName: undefined,
            lastName: undefined,
            speciality: undefined,
            registrationNumber: "Matricule déja utilisé !",
            password: undefined,
        }
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

    return {
        success: true
    }
}

const EditTimeTableFormSchema = z.object({
    doctorId: z.coerce.number().min(1, "Identifiant invalide !"),
    worksSunday: z.boolean(),
    worksMonday: z.boolean(),
    worksTuesday: z.boolean(),
    worksWednesday: z.boolean(),
    worksThursday: z.boolean(),
    worksFriday: z.boolean(),
    worksSaturday: z.boolean(),
});

export async function editTimeTable(_: any, formData: FormData) {
    const user = await getUser()
    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    const validationResult = EditTimeTableFormSchema.safeParse({
        doctorId: formData.get('doctor-id'),
        worksSunday: formData.get('works-sunday') === 'on',
        worksMonday: formData.get('works-monday') === 'on',
        worksTuesday: formData.get('works-tuesday') === 'on',
        worksWednesday: formData.get('works-wednesday') === 'on',
        worksThursday: formData.get('works-thursday') === 'on',
        worksFriday: formData.get('works-friday') === 'on',
        worksSaturday: formData.get('works-saturday') === 'on',
    });

    if (!validationResult.success) return {
        errors: validationResult.error.flatten().fieldErrors
    }

    const { doctorId, worksSunday, worksMonday, worksFriday, worksSaturday, worksThursday, worksTuesday, worksWednesday } = validationResult.data

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

    return {
        success: true
    }
}

export async function removeDoctor(doctorId: number) {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    await prisma.doctor.delete({
        where: { id: doctorId },
    })

    revalidatePath('/admin/doctors')
}

const EditDoctorPasswordFormSchema = z.object({
    password: z.string().min(1, "Mot de passe invalide !"),
    doctorId: z.coerce.number().min(1, "Identifiant invalide !")
})

export async function editDoctorPassword(_: any, formData: FormData) {

    const user = await getUser()
    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    const validationResult = EditDoctorPasswordFormSchema.safeParse({
        password: formData.get('password'),
        doctorId: formData.get('doctor-id')
    });


    if (!validationResult.success) return {
        errors: validationResult.error.flatten().fieldErrors
    }

    const { password, doctorId } = validationResult.data


    if (!(await prisma.doctor.count({ where: { id: doctorId } }))) return {
        errors: {
            doctorId: "Docteur introuvable !",
            password: undefined,
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.doctor.update({
        where: { id: doctorId },
        data: { password: hashedPassword },
    })

    revalidatePath("/admin/doctors")

    return {
        success: true
    }
}

