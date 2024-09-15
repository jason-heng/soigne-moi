"use client"

import { FieldError } from '@/components/field-error';
import SubmitButton from '@/components/submit-button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { useFormReset } from '@/hooks/use-form-reset';
import { useToastMessage } from '@/hooks/use-toast-message';
import { EMPTY_FORM_STATE } from '@/lib/to-form-state';
import { useFormState } from 'react-dom';
import { addSecretary } from './actions';

export function AddSecretaryForm() {
    const [state, action] = useFormState(addSecretary, EMPTY_FORM_STATE)

    useToastMessage(state)
    const formRef = useFormReset(state)

    return (
        <Card className='overflow-y-auto relative space-y-3 lg:w-[35%]'>
            <CardHeader className='pb-2 sticky top-0 bg-background'>
                <CardTitle className='text-xl text-primary'>Ajouter une secrétaire</CardTitle>
            </CardHeader>
            <form action={action} ref={formRef}>
                <CardContent className='space-y-3'>
                    <div>
                        <Label htmlFor="last-name" className='text-muted-foreground'>Nom</Label>
                        <Input
                            type="text"
                            id='last-name'
                            name='last-name'
                            placeholder="Le nom de la secrétaire"
                        />
                        <FieldError formState={state} name='lastName' />
                    </div>
                    <div>
                        <Label htmlFor="first-name" className='text-muted-foreground'>Prénom</Label>
                        <Input
                            type="text"
                            id='first-name'
                            name='first-name'
                            placeholder="Le prénom de la secrétaire"
                        />
                        <FieldError formState={state} name='firstName' />
                    </div>
                    <div>
                        <Label htmlFor="email" className='text-muted-foreground'>Email</Label>
                        <Input
                            type="email"
                            id='email'
                            name='email'
                            placeholder="L'email de la secrétaire"
                        />
                        <FieldError formState={state} name='email' />
                    </div>
                    <div>
                        <Label htmlFor="password" className='text-muted-foreground'>Mot de passe</Label>
                        <PasswordInput
                            id='password'
                            name='password'
                            placeholder="Le mot de passe de la secrétaire"
                            autoComplete='new-password'
                        />
                        <FieldError formState={state} name='password' />
                    </div>
                </CardContent>
                <CardFooter className='flex justify-end lg:absolute lg:right-0 lg:bottom-0'>
                    <SubmitButton>Ajouter</SubmitButton>
                </CardFooter>
            </form>
        </Card>
    )
}