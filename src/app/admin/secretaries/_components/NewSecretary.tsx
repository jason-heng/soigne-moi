"use client"

import { toast } from 'react-hot-toast';
import { Card } from '@/_components/ui/card';
import { CardHeader } from '@/_components/ui/card';
import { CardTitle } from '@/_components/ui/card';
import { CardContent } from '@/_components/ui/card';
import { CardFooter } from '@/_components/ui/card';
import { Label } from '@/_components/ui/label';
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { addSecretary } from '../actions';


export function NewSecretary() {
    const [state, action] = useFormState(addSecretary, null)

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset()
            toast.success("Secrétaire ajouté !")
        }
    }, [state])

    return (
        <Card className='max-w-[350px] flex-grow overflow-y-auto relative space-y-3 w-[300px]'>
            <CardHeader className='pb-2 sticky top-0 bg-background'>
                <CardTitle className='text-xl text-primary'>Ajouter une secrétaire</CardTitle>
            </CardHeader>
            <form action={action} ref={formRef}>
                <CardContent className='space-y-3'>
                    <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input type="text" placeholder="L'email de la secrétaire" autoComplete='off' name='lastName' />
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
                        <Input type="password" autoComplete='off' placeholder="Le mot de passe de la secrétaire" name='password' />
                        {state?.errors?.password && <p className='text-sm text-destructive'>{state.errors.password}</p>}
                    </div>
                </CardContent>
                <CardFooter className='absolute w-full flex justify-end bottom-0'>
                    <Button>Ajouter</Button>
                </CardFooter>
            </form>
        </Card>
    )
}