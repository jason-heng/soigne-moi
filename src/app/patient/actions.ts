"use server"

import { getUser } from "@/data/users";
import prisma from "@/lib/prisma";
import { FormState, fromErrorToFormState, toFormState } from "@/lib/to-form-state";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const NewStayFormSchema = z.object({
    reason: z.string().min(1, "Motif requis."),
    start: z.string().datetime("Date de début requise."),
    end: z.string().datetime("Date de fin requise."),
    doctorId: z.coerce.number().min(1, 'Docteur requis.'),
});

export async function createStay(state: FormState, formData: FormData): Promise<FormState> {
    const user = await getUser()

    try {
        const { reason, start, end, doctorId } = NewStayFormSchema.parse({
            reason: formData.get('reason'),
            start: formData.get('start'),
            end: formData.get('end'),
            doctorId: formData.get('doctor-id'),
        })

        await prisma.$transaction(async (prisma) => {
            const stay = await prisma.stay.create({
                data: {
                    patientId: user.id,
                    doctorId,
                    reason,
                    start,
                    end
                }
            });

            const prescription = await prisma.prescription.create({
                data: {
                    start,
                    end,
                    stayId: stay.id,
                },
            });

            await prisma.stay.update({
                where: { id: stay.id },
                data: {
                    prescriptionId: prescription.id,
                },
            });
        });

        revalidatePath("/patient")

        return toFormState("SUCCESS", {
            message: "Séjour ajouté !"
        })
    } catch (error) {
        return fromErrorToFormState(error)
    }
}