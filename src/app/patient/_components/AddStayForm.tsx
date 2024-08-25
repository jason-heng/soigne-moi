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
    const [selectedSpeciality, setSelectedSpeciality] = useState<string>()
    const [selectedDoctorId, setSelectedDoctorId] = useState<string>()
    const [overbookedDates, setOverbookedDates] = useState<Date[]>([])

    const selectedDoctor = selectedDoctorId ? doctors.find(d => d.id === +selectedDoctorId) : undefined

    const formRef = useRef<HTMLFormElement>(null);

    const specialityOptions: ComboboxOption[] = []

    for (const doctor of doctors) {
        if (!specialityOptions.find(speciality => speciality.label === doctor.speciality)) {
            specialityOptions.push({
                label: doctor.speciality,
                value: doctor.speciality.toLowerCase()
            })
        }
    }

    const doctorOptions: ComboboxOption[] = doctors.filter(doctor => doctor.speciality.toLowerCase() === selectedSpeciality).map(doctor => ({
        label: `${doctor.firstName} ${doctor.lastName} (${doctor.speciality})`,
        value: '' + doctor.id,
    }))

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset()
            setDateRange(undefined)
            setSelectedDoctorId(undefined)
            toast.success("Séjour ajouté !")
        }
    }, [state])

    useEffect(() => {
        if (selectedDoctorId) {
            getOverbookedDates(+selectedDoctorId).then(setOverbookedDates)
        } else {
            setOverbookedDates([])
        }
    }, [selectedDoctorId])

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
                        <Label htmlFor="speciality">Specialité</Label>
                        <Combobox placeholder='Choisir une specialité' emptyPlaceholder='Aucune specialité trouvée.' options={specialityOptions} selected={selectedSpeciality} setSelected={setSelectedSpeciality} />
                    </div>
                    <div>
                        <Label htmlFor="doctor">Docteur</Label>
                        <input type="number" name='doctor-id' value={selectedDoctorId} className='hidden'  />
                        <Combobox placeholder='Choisir un docteur' emptyPlaceholder='Aucun docteur trouvé.' options={doctorOptions} selected={selectedDoctorId} setSelected={setSelectedDoctorId} disabled={!selectedSpeciality} />
                        {state?.errors?.doctorId && <p className='text-sm text-destructive'>{state.errors.doctorId}</p>}
                    </div>
                    <div>
                        <Label htmlFor="duration">Durée</Label>
                        <DatePickerWithRange disabled={!selectedDoctorId} dateRange={dateRange} setDateRange={setDateRange} startName='start' endName='end' disabledDates={overbookedDates} workingDays={workingDays} />
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