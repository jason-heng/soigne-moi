"use client"

import SubmitButton from "@/components/submit-button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDoctor, getDoctors } from '@/data/doctors';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { addDoctor, editDoctorPassword, editTimeTable, removeDoctor } from "./actions";
import { DoctorCard } from "./server-components";

export function AddDoctorForm() {
    const [state, action] = useFormState(addDoctor, null)

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.success) {
            toast.success('Docteur ajouté !')
        }
    }, [state])

    return (
        <Card className='overflow-y-auto relative lg:w-[35%]'>
            <CardHeader className='lg:pb-1 bg-background'>
                <CardTitle className='text-xl text-primary'>Ajouter un docteur</CardTitle>
            </CardHeader>
            <form action={action} ref={formRef}>
                <CardContent className="space-y-3 lg:space-y-0">
                    <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input type="text" placeholder="Le nom du docteur" autoComplete='off' name='lastName' />
                        {state?.errors?.lastName && <p className='text-sm text-destructive'>{state.errors.lastName}</p>}
                    </div>
                    <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input type="text" placeholder="Le prénom du docteur" autoComplete='off' name='firstName' />
                        {state?.errors?.firstName && <p className='text-sm text-destructive'>{state.errors.firstName}</p>}
                    </div>
                    <div>
                        <Label htmlFor="speciality">Specialité</Label>
                        <Input type="text" placeholder="La specialité du docteur" autoComplete='off' name='speciality' />
                        {state?.errors?.speciality && <p className='text-sm text-destructive'>{state.errors.speciality}</p>}
                    </div>
                    <div>
                        <Label htmlFor="registrationNumber">Matricule</Label>
                        <Input type="number" placeholder="Le matricule du docteur" autoComplete='off' name='registrationNumber' />
                        {state?.errors?.registrationNumber && <p className='text-sm text-destructive'>{state.errors.registrationNumber}</p>}
                    </div>
                    <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input type="password" placeholder="Le mot de passe du docteur" autoComplete='new-password' name="password" />
                        {state?.errors?.password && <p className='text-sm text-destructive'>{state.errors.password}</p>}
                    </div>
                </CardContent>
                <CardFooter className='flex justify-end lg:absolute lg:right-0 lg:bottom-0'>
                    <SubmitButton>Ajouter</SubmitButton>
                </CardFooter>
            </form>
        </Card>
    )
}

export function DoctorsList({ doctors }: { doctors: Awaited<ReturnType<typeof getDoctors>> }) {
    const [search, setSearch] = useState("")

    const visibleDoctors = doctors.filter(doctor => `${doctor.firstName.toLowerCase()} ${doctor.firstName.toLowerCase()}`.includes(search.toLowerCase()) || doctor.speciality.toLowerCase().includes(search.toLowerCase()) || doctor.registrationNumber.toString().includes(search.toLowerCase()))

    return (
        <Card className='flex-1 shadow-2xl border-gray-300 rounded-xl overflow-y-auto'>
            <CardHeader className='sticky top-0 bg-white'>
                <CardTitle className='text-xl text-primary'>Liste des docteurs</CardTitle>
                <CardDescription className="relative">
                    <MagnifyingGlassIcon className="absolute top-[50%] translate-y-[-50%] right-2" />
                    <Input placeholder="Rechercher..." className='w-full' onChange={e => setSearch(e.target.value)} value={search} />
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                {visibleDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </CardContent>
        </Card>
    )
}

export function EditPasswordDialog({ doctorId }: { doctorId: number }) {
    const [state, action] = useFormState(editDoctorPassword, null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (state?.success) {
            toast.success('Mot de passe modifié !')
            setOpen(false)
        }
    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className=' h-7 text-s hover:bg-primary text-primary hover:text-white shadow-md'>Modifier le mot de passe</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[350px] lg:max-w-[425px] rounded-lg">
                <DialogHeader>
                    <DialogTitle>Changer le mot de passe</DialogTitle>
                </DialogHeader>
                <form action={action}>
                    <div className="grid gap-2 py-4">
                        <input type="text" className='hidden' name='doctor-id' value={doctorId} />
                        <Label htmlFor="name" >
                            Nouveau mot de passe
                        </Label>
                        <Input
                            type='password'
                            name="password"
                            className="col-span-3"
                        />
                        {state?.errors?.password && <p className='text-sm text-destructive'>{state.errors.password}</p>}
                    </div>
                    <DialogFooter>
                        <SubmitButton>Sauvegarder</SubmitButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

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

export function RemoveAlertDialog({ doctorId }: { doctorId: number }) {
    const [open, setOpen] = useState(false)

    async function handleConfirm() {
        await removeDoctor(doctorId)
        toast.success('Docteur retiré !')
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="secondary" className="shadow-md h-7 text-destructive hover:bg-destructive hover:text-white">Retirer</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[350px] lg:max-w-[425px] rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-left">Etes vous sure de continuer ?</AlertDialogTitle>
                    <AlertDialogDescription className="text-left">
                        Cette action est irreversible. Ce docteur et tous ces avis et séjours seront definitivement supprimé des serveurs.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={handleConfirm}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}