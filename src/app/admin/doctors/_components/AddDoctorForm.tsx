"use client"

import SubmitButton from "@/_components/SubmitButton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { addDoctor } from "../actions";

export default function AddDoctorForm() {
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