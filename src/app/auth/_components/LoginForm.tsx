"use client"

import { useFormState } from "react-dom"
import { login } from "../actions"
import { Input } from "@/_components/ui/input"
import { Button } from "@/_components/ui/button"
import SubmitButton from "@/_components/SubmitButton"

export function LoginForm() {
    const [state, action] = useFormState(login, null)

    return (
        <form className='flex flex-col gap-4' action={action}>
            <div>
                <Input type="email" placeholder="Email" name="email" id='email' />
                {state?.errors?.email && <p className='text-sm text-destructive'>{state?.errors.email}</p>}
            </div>
            <div>
                <Input type="password" placeholder="Mot de passe" name="password" id='password' />
                {state?.errors?.password && <p className='text-sm text-destructive'>{state?.errors.password}</p>}
            </div>
            <SubmitButton text="Se Connecter" className='mt-2'/>
        </form>
    )
}