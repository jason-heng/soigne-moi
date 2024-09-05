"use client"

import { useFormState } from "react-dom"
import { signup } from "../actions"
import { Input } from "@/_components/ui/input"
import SubmitButton from "@/_components/SubmitButton"

export function SignupForm() {
    const [state, action] = useFormState(signup, null)

    return (
        <form className='flex flex-col gap-4 w-[380px]' action={action}>
            <div className='flex gap-2'>
                <div>
                    <Input type="text" placeholder="Nom" name='lastName' />
                    {state?.errors?.lastName && <p className='text-sm text-destructive'>{state.errors.lastName}</p>}
                </div>
                <div>
                    <Input type="text" placeholder="Prénom" name='firstName' />
                    {state?.errors?.firstName && <p className='text-sm text-destructive'>{state.errors.firstName}</p>}
                </div>
            </div>
            <div >
                <Input type="email" placeholder="Email" name='email' />
                {state?.errors?.email && <p className='text-sm text-destructive'>{state.errors.email}</p>}
            </div >
            <div>
                <Input type="text" placeholder="Adresse" name='address' />
                {state?.errors?.address && <p className='text-sm text-destructive'>{state.errors.address}</p>}
            </div>
            <div className='flex gap-2'>
                <div>
                    <Input type="password" placeholder="Mot de passe" name='password' />
                    {state?.errors?.password && <p className='text-sm text-destructive'>{state.errors.password}</p>}
                </div>
                <div >
                    <Input type="password" placeholder="Répéter mot de passe" name='repeatPassword' />
                    {state?.errors?.repeatPassword && <p className='text-sm text-destructive'>{state.errors.repeatPassword}</p>}
                </div>
            </div>
            <SubmitButton  className='mt-2'>S'inscrire</SubmitButton>
        </form>
    )
}