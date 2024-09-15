"use client"

import SubmitButton from '@/components/submit-button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { editSecretaryPassword, removeSecretary } from './actions'

export function EditPasswordDialog({ secretaryId, open, setOpen }: { secretaryId: number, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const [state, action] = useFormState(editSecretaryPassword, null)

    useEffect(() => {
        if (state?.success) {
            toast.success('Mot de passe modifié !')
            setOpen(false)
        }
    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-[350px] lg:max-w-[425px] rounded-lg">
                <DialogHeader>
                    <DialogTitle>Changer le mot de passe</DialogTitle>
                </DialogHeader>
                <form action={action}>
                    <div className="py-4">
                        <input type="text" className='hidden' name='secretary-id' value={secretaryId} />
                        <Label htmlFor="name" >Nouveau mot de passe</Label>
                        <Input
                            type='password'
                            name="password"
                            className="col-span-3"
                        />
                        {state?.errors?.password && <p className='text-sm text-destructive'>{state.errors.password}</p>}
                    </div>
                    <DialogFooter>
                        <SubmitButton>Modifier</SubmitButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export function RemoveAlertDialog({ secretaryId, open, setOpen }: { secretaryId: number, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    async function handleConfirm() {
        await removeSecretary(secretaryId)
        toast.success('Secrétaire retirée !')
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="max-w-[350px] lg:max-w-[425px] rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-left">Etes vous sure de continuer ?</AlertDialogTitle>
                    <AlertDialogDescription className="text-left">
                        Cette action est irreversible. Cette secrétaire sera definitivement supprimé des serveurs.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={handleConfirm}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}