"use client"

import { ColumnDef } from "@tanstack/react-table"
import { getSecretaries } from "@/_data/secretaries"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu"
import { Button } from "@/_components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { removeSecretary } from "../actions"
import { useFormState } from "react-dom"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import toast from "react-hot-toast"
import EditPasswordDialog from "./EditPasswordDialog"
import { RemoveAlertDialog } from "./RemoveAlertDialog"
import { Dialog } from "@/_components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog"

function Dropdown({ setEditPasswordPopupOpen, setRemoveAlertOpen }: { setEditPasswordPopupOpen: Dispatch<SetStateAction<boolean>>, setRemoveAlertOpen: Dispatch<SetStateAction<boolean>> }) {
    function handleEditPassword() {
        setEditPasswordPopupOpen(true)
    }

    function handleRemove() {
        setRemoveAlertOpen(true)
    }


}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const secretariesColumns: ColumnDef<Awaited<ReturnType<typeof getSecretaries>>[0]>[] = [
    {
        accessorKey: 'id',
        header: 'Id'
    },
    {
        accessorKey: "lastName",
        header: "Nom",
    },
    {
        accessorKey: "firstName",
        header: "Prénom",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

            const secretary = row.original

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>Modifier le mot de passe</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-destructive focus:text-destructive">Retirer</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <EditPasswordDialog secretaryId={secretary.id} open={isEditDialogOpen} setOpen={setIsEditDialogOpen} />

                    <RemoveAlertDialog secretaryId={secretary.id} open={isDeleteDialogOpen} setOpen={setIsDeleteDialogOpen} />
                </>
            )
        }
    }
]
