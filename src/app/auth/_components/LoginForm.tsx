"use client"

import { useFormState } from "react-dom"
import { login } from "../actions"
import { Input } from "@/_components/ui/input"
import SubmitButton from "@/_components/SubmitButton"

export function LoginForm() {
    const [state, action] = useFormState(login, null)

    return (
        <form className='flex flex-col gap-4 w-[310px]' action={action}>
            <div>
                <Input type="email" placeholder="Email" name="email" />
                {state?.errors?.email && <p className='text-sm text-destructive'>{state?.errors.email}</p>}
            </div>
            <div>
                <Input type="password" placeholder="Mot de passe" name="password" />
                {state?.errors?.password && <p className='text-sm text-destructive'>{state?.errors.password}</p>}
            </div>
            <SubmitButton className='mt-2'>Se Connecter</SubmitButton>
        </form>
    )
}