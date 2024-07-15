"use client"

import { z } from 'zod';
import { createStay } from '@/lib/stays';
import { toast } from 'react-hot-toast';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Combobox, ComboboxOption } from '@/components/Combobox';
import { DatePickerWithRange } from '@/components/DatePickerWithRange';
import { getDoctors } from '@/lib/doctors';
import { Button } from '../../ui/button';
import { useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';


export function NewStay({ userId, doctors, disabled }: { userId: number, doctors: Awaited<ReturnType<typeof getDoctors>>, disabled: boolean }) {
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [selectedDoctor, setSelectedDoctor] = useState<ComboboxOption>()

    const formRef = useRef<HTMLFormElement>(null);

    const doctorOptions = doctors.map(doctor => ({ label: `${doctor.firstName} ${doctor.lastName} (${doctor.speciality})`, value: `${doctor.firstName} ${doctor.lastName} (${doctor.speciality})`.toLowerCase(), id: doctor.id }))


    async function handleSubmit(formData: FormData) {
        const newStaySchema = z.object({
            reason: z.string().min(1, "Motif invalide !"),
            start: z.string().datetime("Date de début invalide !"),
            end: z.string().datetime("Date de fin invalide !"),
            doctorId: z.coerce.number(),
        });

        try {
            const data = newStaySchema.parse({
                reason: formData.get('reason'),
                start: formData.get('start'),
                end: formData.get('end'),
                doctorId: formData.get('doctorId'),
            });

            await createStay({ ...data, patientId: userId })

            formRef.current?.reset()
            setDateRange(undefined)
            setSelectedDoctor(undefined)
            toast.success("Séjour ajouté !")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <Card className='min-w-[350px] flex-grow overflow-y-auto relative space-y-3 w-[300px]'>
            <CardHeader className='pb-2 sticky top-0 bg-background'>
                <CardTitle className='text-xl text-primary'>Nouveau séjour</CardTitle>
            </CardHeader>
            <form action={handleSubmit} ref={formRef}>
                <CardContent className='space-y-3'>
                    <div>
                        <Label htmlFor="reason">Motif</Label>
                        <Input type="text" id="reason" placeholder="Le motif de votre séjour" name='reason' />
                    </div>
                    <div>
                        <Label htmlFor="doctor">Docteur</Label>
                        <Combobox options={doctorOptions} selected={selectedDoctor} setSelected={setSelectedDoctor} />
                    </div>
                    <div>
                        <Label htmlFor="duration">Durée</Label>
                        <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
                    </div>
                </CardContent>
                <CardFooter className='absolute w-full flex justify-end bottom-0'>
                    <Button disabled={disabled} >Ajouter</Button>
                </CardFooter>
            </form>
        </Card>
    )
}