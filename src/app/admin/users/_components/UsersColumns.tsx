"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/_components/ui/checkbox"
import { setAdmin } from "../actions"
import { getUsers } from "@/_data/users"
import { useState } from "react"
import { ToggleAdminAlertDialog } from "./ToggleAdminAlertDialog"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const usersColumns: ColumnDef<Awaited<ReturnType<typeof getUsers>>[0] & { me: boolean }>[] = [
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
        accessorKey: "address",
        header: "Adresse",
    },
    {
        accessorKey: "admin",
        header: "Admin",
        cell: ({ row }) => {
            const [isToggleAdminAlertOpen, setIsToggleAdminAlertOpen] = useState(false)

            const user = row.original

            return (
                <>
                <Checkbox
                    className="ml-3"
                    checked={user.admin}
                    disabled={user.me}
                    onCheckedChange={() => setIsToggleAdminAlertOpen(true)}
                    aria-label="Select row"
                />
                
                <ToggleAdminAlertDialog open={isToggleAdminAlertOpen} setOpen={setIsToggleAdminAlertOpen} userId={user.id} isAdmin={user.admin}/>
                </>
            )
        },
    },
]
