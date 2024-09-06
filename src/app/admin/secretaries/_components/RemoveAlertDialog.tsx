"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog"
import { buttonVariants } from "@/_components/ui/button"
import { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"
import { removeSecretary } from "../actions"

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