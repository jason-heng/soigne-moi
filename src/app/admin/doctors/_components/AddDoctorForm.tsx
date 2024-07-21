"use client"

import { useFormState } from "react-dom";
import { addDoctor } from "../actions";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle } from "@/_components/ui/card";
import { Label } from "recharts";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";

export default function AddDoctorForm() {
    const [state, action] = useFormState(addDoctor, null)

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.success) {
            toast.success('Docteur ajouté !')
        }
    }, [state])

    return (
        <Card className='w-2/5 shadow-2xl px-6 border-gray-300 rounded-xl border-[1px] relative overflow-y-auto'>
            <CardHeader className='pb-2 px-1'>
                <CardTitle className='text-xl text-primary mb-4'>Ajouter un médecin</CardTitle>

                <form className='px-0 flex-col flex gap-4' action={action} ref={formRef}>
                    <div className='w-full'>
                        <Label>Nom:</Label>
                        <Input placeholder='Entrez le nom du médecin...' name='lastName' />
                        {state?.errors?.lastName && <p className='text-sm text-destructive'>{state.errors.lastName}</p>}
                    </div>

                    <div className='w-full'>
                        <Label>Prénom:</Label>
                        <Input placeholder='Entrez le prénom du médecin...' name='firstName' />
                        {state?.errors?.firstName && <p className='text-sm text-destructive'>{state.errors.firstName}</p>}
                    </div>

                    <div className='w-full'>
                        <Label>Spécialité:</Label>
                        <Input placeholder='Entrez la spécialité du médecin...' name='speciality' />
                        {state?.errors?.speciality && <p className='text-sm text-destructive'>{state.errors.speciality}</p>}
                    </div>

                    <div className='w-full'>
                        <Label className='mb-10'>Matricule:</Label>
                        <Input placeholder='Entrez le matricule du médecin...' name='registrationNumber' type='number' />
                        {state?.errors?.registrationNumber && <p className='text-sm text-destructive'>{state.errors.registrationNumber}</p>}
                    </div>

                    <div className='w-full'>
                        <Label>Mot de passe:</Label>
                        <Input placeholder='Entrez un mot de passe...' name='password' type='password' />
                        {state?.errors?.password && <p className='text-sm text-destructive'>{state.errors.password}</p>}
                    </div>
                    <Button className='mt-0 mx-auto px-20 w-fit text-md bottom-[90%] tall:left-[50%] tall:translate-x-[-50%] tall:absolute tall:bottom-[10%]'>Ajouter</Button>
                </form>
            </CardHeader>
        </Card>
    )
}