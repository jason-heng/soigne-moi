"use client"

import { Button } from '@/_components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/_components/ui/dialog'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { editSecretaryPassword } from '../actions'
import toast from 'react-hot-toast'

export default function EditPasswordPopup({ secretaryId, open, setOpen }: { secretaryId: number, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const [state, action] = useFormState(editSecretaryPassword, null)

    useEffect(() => {
        if (state?.success) {
            toast.success('Mot de passe modifié !')
            setOpen(false)
        }
    }, [state])

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Changer le mot de passe</DialogTitle>
                </DialogHeader>
                <form action={action}>
                    <div className="grid gap-2 py-4">
                        <input type="text" className='hidden' name='secretary-id' value={secretaryId} />
                        <Label htmlFor="name" >
                            Nouveau mot de passe
                        </Label>
                        <Input
                            type='password'
                            name="password"
                            className="col-span-3"
                        />
                        {state?.errors?.password && <p className='text-sm text-destructive'>{state.errors.password}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Sauvegarder</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
