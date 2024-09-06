"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/_components/ui/alert-dialog"
import { Button, buttonVariants } from "@/_components/ui/button"
import { useState } from "react"
import toast from "react-hot-toast"
import { removeDoctor } from "../actions"

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
                    <AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={handleConfirm}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}