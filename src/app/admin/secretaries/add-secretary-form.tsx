"use client"

import SubmitButton from '@/components/submit-button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-hot-toast';
import { addSecretary } from './actions';

export function AddSecretaryForm() {
    const [state, action] = useFormState(addSecretary, null)
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset()
            toast.success("Secrétaire ajouté !")
        }
    }, [state])

    return (
        <Card className='overflow-y-auto relative space-y-3 lg:w-[35%]'>
            <CardHeader className='pb-2 sticky top-0 bg-background'>
                <CardTitle className='text-xl text-primary'>Ajouter une secrétaire</CardTitle>
            </CardHeader>
            <form action={action} ref={formRef}>
                <CardContent className='space-y-3'>
                    <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input type="text" placeholder="Le nom de la secrétaire" autoComplete='off' name='lastName' />
                        {state?.errors?.lastName && <p className='text-sm text-destructive'>{state.errors.lastName}</p>}
                    </div>
                    <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input type="text" placeholder="Le prénom de la secrétaire" autoComplete='off' name='firstName' />
                        {state?.errors?.firstName && <p className='text-sm text-destructive'>{state.errors.firstName}</p>}
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" placeholder="L'email de la secrétaire" autoComplete='off' name='email' />
                        {state?.errors?.email && <p className='text-sm text-destructive'>{state.errors.email}</p>}
                    </div>
                    <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input type="password" placeholder="Le mot de passe de la secrétaire" autoComplete='new-password' name='password' />
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