"use client"

import { getDoctor } from "@/_data/doctors"
import { Label } from "@radix-ui/react-label"
import { Button } from '@/_components/ui/button'
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useFormState } from "react-dom"
import { Checkbox } from "@/_components/ui/checkbox"
import { setTimeTable } from "../actions"

export function DoctorTimeTable({ setShowTimeTable, doctor }: { setShowTimeTable: Function, doctor: NonNullable<Awaited<ReturnType<typeof getDoctor>>> }) {
    const [state, action] = useFormState(setTimeTable, null)

    useEffect(() => {
        if (state?.success) {
            toast.success("Emploi du temps modifié !")
            closePopup()
        }

        console.log(state);
    }, [state])

    function closePopup() {
        setShowTimeTable(false)
    }

    return (
        <div>
            <div className='bg-black absolute bottom-0 top-0 right-0 left-0 opacity-50 z-10' onClick={(e) => { setShowTimeTable(false) }}></div>
            <div className="bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 opacity-100 rounded-lg p-8 flex flex-col gap-4">
                <h1 className='font-bold text-xl text-primary'>Emploi du temps de Dr.{doctor.firstName}</h1>
                <form className="flex flex-col gap-2" action={action}>
                    <p className="mt-1 text-lg font-semibold text-gray-700">Jours de travail:</p>
                    <input type="text" name="doctor-id" value={doctor.id} className="hidden" />
                    <Label className="flex gap-3">
                        <Checkbox id="works-sunday" name="works-sunday" defaultChecked={doctor.worksSunday} />
                        <label
                            htmlFor="works-sunday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Dimanche
                        </label>
                    </Label>

                    <Label className="flex gap-3">
                        <Checkbox id="works-monday" name="works-monday" defaultChecked={doctor.worksMonday} />
                        <label
                            htmlFor="works-monday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Lundi
                        </label>
                    </Label>

                    <Label className="flex gap-3">
                        <Checkbox id="works-tuesday" name="works-tuesday" defaultChecked={doctor.worksTuesday}/>
                        <label
                            htmlFor="works-tuesday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Mardi
                        </label>
                    </Label>

                    <Label className="flex gap-3">
                        <Checkbox id="works-wednesday" name="works-wednesday" defaultChecked={doctor.worksWednesday}/>
                        <label
                            htmlFor="works-wednesday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Mercredi
                        </label>
                    </Label>

                    <Label className="flex gap-3">
                        <Checkbox id="works-thursday" name="works-thursday" defaultChecked={doctor.worksThursday}/>
                        <label
                            htmlFor="works-thursday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Jeudi
                        </label>
                    </Label>

                    <Label className="flex gap-3">
                        <Checkbox id="works-friday" name="works-friday" defaultChecked={doctor.worksFriday}/>
                        <label
                            htmlFor="works-friday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Vendredi
                        </label>
                    </Label>

                    <Label className="flex gap-3">
                        <Checkbox id="works-saturday" name="works-saturday" defaultChecked={doctor.worksSaturday}/>
                        <label
                            htmlFor="works-saturday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Samedi
                        </label>
                    </Label>

                    <div className="flex gap-6 ml-auto mt-5">
                        <Button variant="destructive" onClick={closePopup}>Annuler</Button>
                        <Button>Confirmer </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}