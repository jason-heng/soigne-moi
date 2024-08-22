"use client"

import toast from "react-hot-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog"
import { Dispatch, SetStateAction } from "react"
import { setAdmin } from "../actions"

export function ToggleAdminAlertDialog({ userId, isAdmin, open, setOpen }: { userId: number, isAdmin: boolean, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    async function handleConfirm() {
        await setAdmin(userId, !isAdmin)
        toast.success(isAdmin ? "L'utilisateur n'est plus un administrateur !" : "L'utilisateur est devenu un administrateur !")
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Etes vous sure de continuer ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        { isAdmin ? "Cet utilisateur n'aura plus tous les droits et n'aura plus acces au panel d'administrateur." : "Cet utilisateur aura tous les droits et aura acces au panel d'administrateur."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}