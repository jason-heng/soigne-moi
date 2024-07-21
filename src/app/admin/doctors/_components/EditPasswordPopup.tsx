"use client"

import { Button } from '@/_components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/_components/ui/dialog'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { editDoctorPassword } from '../actions'
import toast from 'react-hot-toast'

export default function EditPasswordPopup({ doctorId}: { doctorId: number }) {
    const [state, action] = useFormState(editDoctorPassword, null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (state?.success) {
            toast.success('Mot de passe modifié !')
            setOpen(false)
        }
    }, [state])

    return (
        <Dialog open={open}>
            <DialogTrigger onClick={() => setOpen(true)} asChild>
                <Button className='bg-white rounded-sm h-7 mx-auto w-36 text-xs hover:bg-blue-500 text-blue-500 hover:text-white border-[2px] shadow-md font-semibold hover:border-none'>Changer mot de passe</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
                        <Button type="submit">Sauvegarder</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
