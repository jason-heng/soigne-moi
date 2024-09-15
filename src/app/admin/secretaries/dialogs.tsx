"use client"

import { FieldError } from '@/components/field-error'
import SubmitButton from '@/components/submit-button'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { useToastMessage } from '@/hooks/use-toast-message'
import { EMPTY_FORM_STATE } from '@/lib/to-form-state'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { editSecretaryPassword, removeSecretary } from './actions'

export function EditPasswordDialog({ secretaryId, open, setOpen }: { secretaryId: number, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const [state, action] = useFormState(editSecretaryPassword.bind(null, secretaryId), EMPTY_FORM_STATE)

    useToastMessage(state)

    useEffect(() => {
        if (state.status === "SUCCESS") {
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
                        <Label htmlFor="name" className='text-muted-foreground'>Nouveau mot de passe</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            placeholder='Le nouveau mot de passe de la secrétaire'
                        />
                        <FieldError formState={state} name='password' />
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
    const [state, action] = useFormState(removeSecretary.bind(null, secretaryId), EMPTY_FORM_STATE)

    useToastMessage(state)

    useEffect(() => {
        if (state.status === "SUCCESS") {
            setOpen(false)
        }
    }, [state])

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
                    <form action={action}>
                        <SubmitButton variant="destructive">Confirmer</SubmitButton>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}