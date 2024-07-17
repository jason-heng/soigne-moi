"use client"

import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { editPassword } from "../actions"
import { useFormState } from "react-dom"

export default function EditPasswordForm() {
    const [state, action] = useFormState(editPassword, null)
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.success) {
            toast.success('Mot de passe modifié !')
            formRef.current?.reset()
        }
    }, [state])

    return (
        <form className='flex flex-col gap-2 max-w-[300px]' action={action} ref={formRef}>
            <h2 className='text-lg'>Changement de mot de passe</h2>
            <div className='w-full'>
                <Label>Nouveau mot de passe:</Label>
                <Input type="password" placeholder='Entrez un mot de passe...' name='new-password' />
                {state?.errors?.newPassword && <p className='text-sm text-destructive'>{state?.errors.newPassword}</p>}
            </div>
            <div className='w-full'>
                <Label>Confirmer le mot de passe:</Label>
                <Input type="password" placeholder='Répétez le mot de passe...' name='repeat-new-password' />
                {state?.errors?.repeatNewPassword && <p className='text-sm text-destructive'>{state?.errors.repeatNewPassword}</p>}
            </div>
            <div className='w-full'>
                <Label>Mot de passe actuel:</Label>
                <Input type="password" placeholder='Entrez votre mot de passe actuel...' name='password' id="password" />
                {state?.errors?.password && <p className='text-sm text-destructive'>{state?.errors.password}</p>}
            </div>
            <Button className='w-full mt-4'>Changer mot de passe</Button>
        </form>
    )
}
