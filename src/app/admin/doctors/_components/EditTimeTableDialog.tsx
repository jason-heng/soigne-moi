"use client"

import SubmitButton from "@/_components/SubmitButton"
import { AlertDialogFooter } from "@/_components/ui/alert-dialog"
import { Button } from '@/_components/ui/button'
import { Checkbox } from "@/_components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/_components/ui/dialog"
import { getDoctor } from "@/_data/doctors"
import { Label } from "@radix-ui/react-label"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import toast from "react-hot-toast"
import { editTimeTable } from "../actions"

export function EditTimeTableDialog({ doctor }: { doctor: NonNullable<Awaited<ReturnType<typeof getDoctor>>> }) {
    const [state, action] = useFormState(editTimeTable, null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (state?.success) {
            toast.success("Emploi du temps modifié !")
            setOpen(false)
        }

    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="shadow-md h-7 hover:text-primary">Emploi du temps</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[350px] lg:max-w-[425px] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-left ">Emploi du temps de Dr. {doctor.firstName} {doctor.lastName}</DialogTitle>
                </DialogHeader>
                <form action={action} className="flex flex-col gap-2">
                    <input type="text" name="doctor-id" value={doctor.id} className="hidden" />

                    <div className="flex items-center space-x-2">
                        <Checkbox id="works-monday" name="works-monday" defaultChecked={doctor.worksMonday} />
                        <Label
                            htmlFor="works-monday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Lundi
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="works-tuesday" name="works-tuesday" defaultChecked={doctor.worksTuesday} />
                        <Label
                            htmlFor="works-tuesday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Mardi
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="works-wednesday" name="works-wednesday" defaultChecked={doctor.worksWednesday} />
                        <Label
                            htmlFor="works-wednesday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Mercredi
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="works-thursday" name="works-thursday" defaultChecked={doctor.worksThursday} />
                        <Label
                            htmlFor="works-thursday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Jeudi
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="works-friday" name="works-friday" defaultChecked={doctor.worksFriday} />
                        <Label
                            htmlFor="works-friday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Vendredi
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="works-saturday" name="works-saturday" defaultChecked={doctor.worksSaturday} />
                        <Label
                            htmlFor="works-saturday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Samedi
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="works-sunday" name="works-sunday" defaultChecked={doctor.worksSunday} />
                        <Label
                            htmlFor="works-sunday"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Dimanche
                        </Label>
                    </div>

                    <AlertDialogFooter>
                        <SubmitButton>Sauvegarder</SubmitButton>
                    </AlertDialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}