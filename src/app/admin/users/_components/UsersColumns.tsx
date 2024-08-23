"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/_components/ui/checkbox"
import { getUsers } from "@/_data/users"
import { useState } from "react"
import { ToggleAdminAlertDialog } from "./ToggleAdminAlertDialog"

type Column = Awaited<ReturnType<typeof getUsers>>[0] & { me: boolean }

export default function UserCell({ user }: { user: Column }) {
    const [isToggleAdminAlertOpen, setIsToggleAdminAlertOpen] = useState(false)

    return (
        <>
            <Checkbox
                className="ml-3"
                checked={user.admin}
                disabled={user.me}
                onCheckedChange={() => setIsToggleAdminAlertOpen(true)}
                aria-label="Select row"
            />

            <ToggleAdminAlertDialog open={isToggleAdminAlertOpen} setOpen={setIsToggleAdminAlertOpen} userId={user.id} isAdmin={user.admin} />
        </>
    )
}


export const usersColumns: ColumnDef<Column>[] = [
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
            return <UserCell user={row.original} />
        },
    },
]
