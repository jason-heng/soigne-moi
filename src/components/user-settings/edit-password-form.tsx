"use client"

import SubmitButton from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import toast from "react-hot-toast"
import { editPassword } from "./actions"

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
        <form className='flex flex-col gap-4 max-w-[260px]' action={action} ref={formRef}>
            <h2 className='text-lg'>Changement de mot de passe</h2>
            <div className='w-full'>
                <Label>Nouveau mot de passe:</Label>
                <Input type="password" placeholder='Entrez un nouveau mot de passe...' name='new-password' />
                {state?.errors?.newPassword && <p className='text-sm text-destructive'>{state?.errors.newPassword}</p>}
            </div>
            <div className='w-full'>
                <Label>Confirmer le mot de passe:</Label>
                <Input type="password" placeholder='Répétez le nouveau mot de passe...' name='repeat-new-password' />
                {state?.errors?.repeatNewPassword && <p className='text-sm text-destructive'>{state?.errors.repeatNewPassword}</p>}
            </div>
            <div className='w-full'>
                <Label>Mot de passe actuel:</Label>
                <Input type="password" placeholder='Entrez votre mot de passe actuel...' name='password' id="password" />
                {state?.errors?.password && <p className='text-sm text-destructive'>{state?.errors.password}</p>}
            </div>
            <SubmitButton className='w-full mt-2'>Changer le mot de passe</SubmitButton>
        </form>
    )
}
