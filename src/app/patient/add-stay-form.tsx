"use client"

import { Combobox, ComboboxOption } from '@/_components/combo-box';
import { DatePickerWithRange } from '@/_components/date-picker-with-range';
import { FieldError } from '@/_components/field-error';
import SubmitButton from '@/_components/submit-button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { EMPTY_FORM_STATE } from '@/_lib/to-form-state';
import { useFormReset } from '@/hooks/use-form-reset';
import { useToastMessage } from '@/hooks/use-toast-message';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useFormState } from 'react-dom';
import { createStay } from './actions';
import { Doctor } from './data';

export function AddStayForm({ doctors, disabled }: { doctors: Doctor[], disabled?: boolean }) {
    const [selectedSpeciality, setSelectedSpeciality] = useState<string>()
    const [selectedDoctorId, setSelectedDoctorId] = useState<string>()
    const [dateRange, setDateRange] = useState<DateRange>()

    const [state, action] = useFormState(createStay, EMPTY_FORM_STATE)

    const selectedDoctor = selectedDoctorId ? doctors.find(d => d.id === +selectedDoctorId) : undefined

    const specialities = doctors.reduce((specialities, doctor) => specialities.includes(doctor.speciality) ? specialities : specialities.concat(doctor.speciality), [] as string[])

    const specialityOptions: ComboboxOption[] = specialities.map(speciality => ({
        label: speciality,
        value: speciality.toLowerCase()
    }))

    const doctorOptions: ComboboxOption[] = doctors.filter(doctor => doctor.speciality.toLowerCase() === selectedSpeciality).map(doctor => ({
        label: `${doctor.firstName} ${doctor.lastName} (${doctor.speciality})`,
        value: '' + doctor.id,
    }))

    useToastMessage(state)
    const formRef = useFormReset(state)

    // useEffect(() => {
    //     // if (state?.success) {
    //     //     setDateRange(undefined)
    //     //     setSelectedDoctorId(undefined)
    //     // }
    // }, [state])

    return (
        <Card className='overflow-y-auto relative space-y-3'>
            <CardHeader className='pb-2 sticky top-0 bg-background'>
                <CardTitle className='text-xl text-primary'>Nouveau séjour</CardTitle>
            </CardHeader>
            <form action={action} ref={formRef}>
                <CardContent className='space-y-3'>
                    <div className="grid gap-2">
                        <Label htmlFor="reason">Motif</Label>
                        <Input
                            type="text"
                            name='reason'
                            id="reason"
                            placeholder="Le motif de votre séjour"
                        />
                        <FieldError formState={state} name='reason' />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="speciality">Specialité</Label>
                        <Combobox
                            placeholder='Choisir une specialité'
                            emptyPlaceholder='Aucune specialité trouvée.'
                            options={specialityOptions}
                            selected={selectedSpeciality}
                            setSelected={setSelectedSpeciality}
                        />
                        <FieldError formState={state} name='speciality' />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="doctor">Docteur</Label>
                        <Combobox
                            placeholder='Choisir un docteur'
                            emptyPlaceholder='Aucun docteur trouvé.'
                            options={doctorOptions}
                            selected={selectedDoctorId}
                            setSelected={setSelectedDoctorId}
                            disabled={!selectedSpeciality}
                        />
                        <FieldError formState={state} name='doctorId' />
                        <input type="hidden" name='doctor-id' value={selectedDoctorId} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="duration">Durée</Label>
                        <DatePickerWithRange
                            placeholder='Choisir une durée'
                            disabled={!selectedDoctorId}
                            selected={dateRange}
                            setSelected={setDateRange}
                            disabledDates={selectedDoctor?.overbookedDates}
                            availableDays={selectedDoctor?.workingDays}
                        />
                        <FieldError formState={state} name='start' />
                        <FieldError formState={state} name='end' />
                        <input type="hidden" value={dateRange?.from?.toISOString()} name="start" />
                        <input type="hidden" value={dateRange?.to?.toISOString()} name="end" />
                    </div>
                </CardContent>
                <CardFooter className='flex justify-end lg:absolute lg:right-0 lg:bottom-0'>
                    <SubmitButton disabled={disabled}>{disabled ? "Séjour en cours ou a venir" : "Ajouter"}</SubmitButton>
                </CardFooter>
            </form>
        </Card>
    )
}