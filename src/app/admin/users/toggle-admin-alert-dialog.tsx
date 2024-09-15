"use client"

import SubmitButton from "@/components/submit-button"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToastMessage } from "@/hooks/use-toast-message"
import { EMPTY_FORM_STATE } from "@/lib/to-form-state"
import { Dispatch, SetStateAction, useEffect } from "react"
import { useFormState } from "react-dom"
import { setAdmin } from "./actions"

export function ToggleAdminAlertDialog({ userId, isAdmin, open, setOpen }: { userId: number, isAdmin: boolean, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const [state, action] = useFormState(setAdmin.bind(null, userId, !isAdmin), EMPTY_FORM_STATE)

    useToastMessage(state)

    useEffect(() => {
        if (state.status === "SUCCESS") {
            setOpen(false)
        }
    }, [state])

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Etes vous sure de continuer ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {isAdmin ? "Cet utilisateur n'aura plus tous les droits et n'aura plus acces au panel d'administrateur." : "Cet utilisateur aura tous les droits et aura acces au panel d'administrateur."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <form action={action}>
                        <SubmitButton >Confirmer</SubmitButton>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}