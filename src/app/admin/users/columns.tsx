"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { getUsers } from "@/data/users"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { ToggleAdminAlertDialog } from "./toggle-admin-alert-dialog"

export type UserColumn = Awaited<ReturnType<typeof getUsers>>[0] & { me: boolean }

export default function UserCell({ user }: { user: UserColumn }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <Checkbox
                className="ml-3"
                checked={user.admin}
                disabled={user.me}
                onCheckedChange={() => setIsDialogOpen(true)}
                aria-label="Select row"
            />

            <ToggleAdminAlertDialog open={isDialogOpen} setOpen={setIsDialogOpen} userId={user.id} isAdmin={user.admin} />
        </>
    )
}

export const usersColumns: ColumnDef<UserColumn>[] = [
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
