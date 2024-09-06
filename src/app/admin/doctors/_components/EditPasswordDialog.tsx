"use client"

import SubmitButton from '@/_components/SubmitButton'
import { Button } from '@/_components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/_components/ui/dialog'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { editDoctorPassword } from '../actions'

export default function EditPasswordDialog({ doctorId }: { doctorId: number }) {
    const [state, action] = useFormState(editDoctorPassword, null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (state?.success) {
            toast.success('Mot de passe modifié !')
            setOpen(false)
        }
    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className=' h-7 text-s hover:bg-primary text-primary hover:text-white shadow-md'>Modifier le mot de passe</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[350px] lg:max-w-[425px] rounded-lg">
                <DialogHeader>
                    <DialogTitle>Changer le mot de passe</DialogTitle>
                </DialogHeader>
                <form action={action}>
                    <div className="grid gap-2 py-4">
                        <input type="text" className='hidden' name='doctor-id' value={doctorId} />
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
                        <SubmitButton>Sauvegarder</SubmitButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
