"use client"

import { ColumnDef } from "@tanstack/react-table"
import { getSecretaries } from "@/_data/secretaries"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu"
import { Button } from "@/_components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { removeSecretary } from "../actions"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import toast from "react-hot-toast"

function Dropdown({ secretary}: { secretary: Awaited<ReturnType<typeof getSecretaries>>[0] }) {
    const [removeState, removeAction] = useFormState(removeSecretary, null)

    useEffect(() => {
        if (removeState?.success) {
            toast.success('Secrétaire retiré !')
        }
    }, [removeState])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Changer le mot de passe</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => removeAction(secretary.id)}>Retirer</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<Awaited<ReturnType<typeof getSecretaries>>[0]>[] = [
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
            const secretary = row.original

            return <Dropdown secretary={secretary} />
        }
    }
]
