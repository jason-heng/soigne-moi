"use client"

import toast from "react-hot-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/_components/ui/alert-dialog"
import { useState } from "react"
import { removeDoctor } from "../actions"
import { Button } from "@/_components/ui/button"

export function RemoveAlertDialog({ doctorId }: { doctorId: number }) {
    const [open, setOpen] = useState(false)

    async function handleConfirm() {
        await removeDoctor(doctorId)
        toast.success('Docteur retiré !')
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="secondary" className="shadow-md h-7 text-destructive hover:bg-destructive hover:text-white">Retirer</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Etes vous sure de continuer ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est irreversible. Ce docteur et tous ces avis et séjours seront definitivement supprimé des serveurs.
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