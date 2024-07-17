"use client"

import { toast } from 'react-hot-toast';
import { Card } from '@/_components/ui/card';
import { CardHeader } from '@/_components/ui/card';
import { CardTitle } from '@/_components/ui/card';
import { CardContent } from '@/_components/ui/card';
import { CardFooter } from '@/_components/ui/card';
import { Label } from '@/_components/ui/label';
import { Input } from '@/_components/ui/input';
import { Combobox, ComboboxOption } from '@/_components/Combobox';
import { DatePickerWithRange } from '@/_components/DatePickerWithRange';
import { getDoctors } from '@/_data/doctors';
import { Button } from '@/_components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useFormState } from 'react-dom';
import { createStay } from '../actions';


export function NewStay({ doctors, disabled }: { doctors: Awaited<ReturnType<typeof getDoctors>>, disabled: boolean }) {
    const [state, action] = useFormState(createStay, null)

    const [dateRange, setDateRange] = useState<DateRange>()
    const [selectedDoctor, setSelectedDoctor] = useState<ComboboxOption>()

    const formRef = useRef<HTMLFormElement>(null);

    const doctorOptions = doctors.map(doctor => ({ label: `${doctor.firstName} ${doctor.lastName} (${doctor.speciality})`, value: `${doctor.firstName} ${doctor.lastName} (${doctor.speciality})`.toLowerCase(), id: doctor.id }))

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset()
            setDateRange(undefined)
            setSelectedDoctor(undefined)
            toast.success("Séjour ajouté !")
        }
    }, [state])

    return (
        <Card className='min-w-[350px] flex-grow overflow-y-auto relative space-y-3 w-[300px]'>
            <CardHeader className='pb-2 sticky top-0 bg-background'>
                <CardTitle className='text-xl text-primary'>Nouveau séjour</CardTitle>
            </CardHeader>
            <form action={action} ref={formRef}>
                <CardContent className='space-y-3'>
                    <div>
                        <Label htmlFor="reason">Motif</Label>
                        <Input type="text" id="reason" placeholder="Le motif de votre séjour" name='reason' />
                        {state?.errors?.reason && <p className='text-sm text-destructive'>{state.errors.reason}</p>}
                    </div>
                    <div>
                        <Label htmlFor="duration">Durée</Label>
                        <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} startName='start' endName='end' />
                        {state?.errors?.start && <p className='text-sm text-destructive'>{state.errors.start}</p>}
                        {state?.errors?.end && <p className='text-sm text-destructive'>{state.errors.end}</p>}
                    </div>
                    <div>
                        <Label htmlFor="doctor">Docteur</Label>
                        <Combobox options={doctorOptions} selected={selectedDoctor} setSelected={setSelectedDoctor} name="doctor-id" />
                        {state?.errors?.doctorId && <p className='text-sm text-destructive'>{state.errors.doctorId}</p>}
                    </div>
                </CardContent>
                <CardFooter className='absolute w-full flex justify-end bottom-0'>
                    <Button disabled={disabled} >Ajouter</Button>
                </CardFooter>
            </form>
        </Card>
    )
}