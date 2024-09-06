"use client"

import { Button } from "@/_components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu"
import { getSecretaries } from "@/_data/secretaries"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import EditPasswordDialog from "./EditPasswordDialog"
import { RemoveAlertDialog } from "./RemoveAlertDialog"

export type SecretaryColumn = Awaited<ReturnType<typeof getSecretaries>>[0]

function SecretaryCell({ secretary }: { secretary: SecretaryColumn }) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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

export const secretariesColumns: ColumnDef<SecretaryColumn>[] = [
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
            return <SecretaryCell secretary={row.original} />
        }
    }
]
