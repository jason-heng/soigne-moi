"use client"

import SubmitButton from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormReset } from "@/hooks/use-form-reset"
import { useToastMessage } from "@/hooks/use-toast-message"
import { EMPTY_FORM_STATE } from "@/lib/to-form-state"
import { useFormState } from "react-dom"
import { FieldError } from "../field-error"
import { editPassword } from "./actions"

export default function EditPasswordForm() {
    const [state, action] = useFormState(editPassword, EMPTY_FORM_STATE)

    useToastMessage(state)
    const formRef = useFormReset(state)

    return (
        <form className='flex flex-col gap-4 max-w-[260px]' action={action} ref={formRef}>
            <h2 className='text-lg'>Changement de mot de passe</h2>
            <div className='w-full'>
                <Label>Nouveau mot de passe:</Label>
                <Input type="password" placeholder='Entrez un nouveau mot de passe...' name='new-password' />
                <FieldError formState={state} name="newPassword" />
            </div>
            <div className='w-full'>
                <Label>Confirmer le mot de passe:</Label>
                <Input type="password" placeholder='Répétez le nouveau mot de passe...' name='repeat-new-password' />
                <FieldError formState={state} name="repeatNewPassword" />
            </div>
            <div className='w-full'>
                <Label>Mot de passe actuel:</Label>
                <Input type="password" placeholder='Entrez votre mot de passe actuel...' name='password' id="password" />
                <FieldError formState={state} name="password" />
            </div>
            <SubmitButton className='w-full mt-2'>Changer le mot de passe</SubmitButton>
        </form>
    )
}
