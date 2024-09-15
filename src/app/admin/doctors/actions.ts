"use server"

import { getUser } from "@/data/users";
import prisma from "@/lib/prisma";
import { deleteSession } from "@/lib/session";
import { FormState, fromErrorToFormState, toFormState } from "@/lib/to-form-state";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const AddDoctorFormSchema = z.object({
    firstName: z.string().min(1, "Prénom requis."),
    lastName: z.string().min(1, "Nom requis."),
    speciality: z.string().min(1, "Spécialité requisé."),
    registrationNumber: z.coerce.number().min(1, "Matricule requis."),
    password: z.string().min(1, "Mot de passe requis."),
});

export async function addDoctor(state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    try {
        const { firstName, lastName, speciality, registrationNumber, password } = AddDoctorFormSchema.parse({
            firstName: formData.get('first-name'),
            lastName: formData.get('last-name'),
            speciality: formData.get('speciality'),
            registrationNumber: formData.get('registration-number'),
            password: formData.get('password'),
        });

        const registrationNumberUsed = await prisma.doctor.count({ where: { registrationNumber } })

        if (registrationNumberUsed) return toFormState("ERROR", {
            fieldErrors: {
                registrationNumber: ["Matricule déja utilisé !"],
            }
        })

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.doctor.create({
            data: {
                registrationNumber,
                firstName,
                lastName,
                speciality,
                password: hashedPassword,
            }
        })

        revalidatePath("/admin/doctors")

        return toFormState("SUCCESS", {
            message: "Docteur ajouté !",
            reset: true
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }
}

const EditTimeTableFormSchema = z.object({
    worksSunday: z.boolean(),
    worksMonday: z.boolean(),
    worksTuesday: z.boolean(),
    worksWednesday: z.boolean(),
    worksThursday: z.boolean(),
    worksFriday: z.boolean(),
    worksSaturday: z.boolean(),
});

export async function editTimeTable(doctorId: number, state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    try {
        const data = EditTimeTableFormSchema.parse({
            worksSunday: formData.get('works-sunday') === 'on',
            worksMonday: formData.get('works-monday') === 'on',
            worksTuesday: formData.get('works-tuesday') === 'on',
            worksWednesday: formData.get('works-wednesday') === 'on',
            worksThursday: formData.get('works-thursday') === 'on',
            worksFriday: formData.get('works-friday') === 'on',
            worksSaturday: formData.get('works-saturday') === 'on',
        });

        const doctorExists = await prisma.doctor.count({ where: { id: doctorId } })

        if (!doctorExists) return toFormState("ERROR", {
            message: "Docteur introuvable !"
        })

        await prisma.doctor.update({
            where: { id: doctorId },
            data,
        })

        revalidatePath('/admin/doctors')

        return toFormState("SUCCESS", {
            message: "Emploi du temps modifié !"
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }
}

export async function removeDoctor(doctorId: number, state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    await prisma.doctor.delete({
        where: { id: doctorId }
    })

    revalidatePath('/admin/doctors')

    return toFormState("SUCCESS", {
        message: "Docteur retiré !"
    })
}

const EditDoctorPasswordFormSchema = z.object({
    password: z.string().min(1, "Mot de passe requis."),
})

export async function editDoctorPassword(doctorId: number, state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    if (!user.admin) {
        deleteSession()
        redirect('/auth')
    }

    try {
        const { password } = EditDoctorPasswordFormSchema.parse({
            password: formData.get('password'),
        });

        const doctorExists = await prisma.doctor.count({ where: { id: doctorId } })

        if (!doctorExists) return toFormState("ERROR", {
            message: "Docteur introuvable !"
        })

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.doctor.update({
            where: { id: doctorId },
            data: { password: hashedPassword },
        })

        return toFormState("SUCCESS", {
            message: "Mot de passe modifié !"
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }
}

