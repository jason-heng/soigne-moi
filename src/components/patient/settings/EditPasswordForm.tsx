"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { editPassword } from "@/lib/users"
import { useRef, useState } from "react"
import toast from "react-hot-toast"

export default function EditPasswordForm({ userId }: { userId: number }) {
    const [newPasswordError, setNewPasswordError] = useState<string | null>(null)
    const [repeatNewPasswordError, setRepeatNewPasswordError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const formRef = useRef<HTMLFormElement>(null);


    async function handleSubmit(formData: FormData) {
        const newPassword = formData.get('newPassword')
        const confirmNewPassword = formData.get('confirmNewPassword')
        const password = formData.get('password')

        setNewPasswordError(null)
        setRepeatNewPasswordError(null)
        setPasswordError(null)

        if (!newPassword) {
            setNewPasswordError("Mot de passe invalide !")
            return
        }

        if (confirmNewPassword !== newPassword) {
            setRepeatNewPasswordError("Mot de passes differents !")
            return
        }

        if (!password) {
            setPasswordError("Mot de passe incorrect !")
            return
        }

        try {
            await editPassword(userId, newPassword.toString(), password.toString())

            formRef.current?.reset()
            toast.success("Mot de passe modifié !")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <form className='flex flex-col gap-2 max-w-[300px]' action={handleSubmit} ref={formRef}>
            <h2 className='text-xl'>Changement de Mot de Passe</h2>
            <div className='w-full'>
                <Label>Nouveau mot de passe:</Label>
                <Input type="password" placeholder='Entrez un mot de passe...' name='newPassword' />
                {newPasswordError && <p className='text-sm text-destructive'>{newPasswordError}</p>}
            </div>
            <div className='w-full'>
                <Label>Confirmer le mot de passe:</Label>
                <Input type="password" placeholder='Répétez le mot de passe...' name='confirmNewPassword' />
                {repeatNewPasswordError && <p className='text-sm text-destructive'>{repeatNewPasswordError}</p>}
            </div>
            <div className='w-full'>
                <Label>Mot de passe actuel:</Label>
                <Input type="password" placeholder='Entrez votre mot de passe actuel...' name='password' />
                {passwordError && <p className='text-sm text-destructive'>{passwordError}</p>}
            </div>
            <Button className='w-full mt-4'>Changer mot de passe</Button>
        </form>
    )
}
