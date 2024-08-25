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
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useFormState } from 'react-dom';
import { createStay, getOverbookedDates } from '../actions';
import SubmitButton from '@/_components/SubmitButton';
import { getWeekday, WeekDay } from '@/_lib/utils';

export function AddStayForm({ doctors, disabled }: { doctors: Awaited<ReturnType<typeof getDoctors>>, disabled: boolean }) {
    const [state, action] = useFormState(createStay, null)

    const [dateRange, setDateRange] = useState<DateRange>()
    const [selectedDoctor, setSelectedDoctor] = useState<ComboboxOption>()
    const [overbookedDates, setOverbookedDates] = useState<Date[]>([])

    const formRef = useRef<HTMLFormElement>(null);

    const doctorOptions = doctors.map(doctor => ({
        label: `${doctor.firstName} ${doctor.lastName} (${doctor.speciality})`,
        value: `${doctor.firstName} ${doctor.lastName} (${doctor.speciality})`.toLowerCase(),
        id: doctor.id,
        worksSunday: doctor.worksSunday,
        worksMonday: doctor.worksMonday,
        worksTuesday: doctor.worksTuesday,
        worksWednesday: doctor.worksWednesday,
        worksThursday: doctor.worksThursday,
        worksFriday: doctor.worksFriday,
        worksSaturday: doctor.worksSaturday
    }))

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset()
            setDateRange(undefined)
            setSelectedDoctor(undefined)
            toast.success("Séjour ajouté !")
        }
    }, [state])

    useEffect(() => {
        if (selectedDoctor) {
            getOverbookedDates(selectedDoctor.id).then(setOverbookedDates)
        } else {
            setOverbookedDates([])
        }
    }, [selectedDoctor])

    const workingDays: WeekDay[] = []

    if (selectedDoctor?.worksSunday) workingDays.push("Sunday");
    if (selectedDoctor?.worksMonday) workingDays.push("Monday");
    if (selectedDoctor?.worksTuesday) workingDays.push("Tuesday");
    if (selectedDoctor?.worksWednesday) workingDays.push("Wednesday");
    if (selectedDoctor?.worksThursday) workingDays.push("Thursday");
    if (selectedDoctor?.worksFriday) workingDays.push("Friday");
    if (selectedDoctor?.worksSaturday) workingDays.push("Saturday");

    return (
        <Card className='overflow-y-auto relative space-y-3'>
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
                        <Label htmlFor="doctor">Docteur</Label>
                        <Combobox options={doctorOptions} selected={selectedDoctor} setSelected={setSelectedDoctor} name="doctor-id" />
                        {state?.errors?.doctorId && <p className='text-sm text-destructive'>{state.errors.doctorId}</p>}
                    </div>
                    <div>
                        <Label htmlFor="duration">Durée</Label>
                        <DatePickerWithRange disabled={!selectedDoctor} dateRange={dateRange} setDateRange={setDateRange} startName='start' endName='end' disabledDates={overbookedDates} workingDays={workingDays} />
                        {state?.errors?.start && <p className='text-sm text-destructive'>{state.errors.start}</p>}
                        {state?.errors?.end && <p className='text-sm text-destructive'>{state.errors.end}</p>}
                    </div>
                </CardContent>
                <CardFooter className='absolute right-0 bottom-0'>
                    <SubmitButton text={disabled ? "Séjour en cours ou a venir" : "Ajouter"} disabled={disabled} />
                </CardFooter>
            </form>
        </Card>
    )
}