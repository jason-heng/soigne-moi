"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/_components/ui/checkbox"
import { setAdmin } from "../actions"
import { getUsers } from "@/_data/users"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<Awaited<ReturnType<typeof getUsers>>[0] & { me: boolean }>[] = [
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
        cell: async ({ row }) => {
            const user = row.original

            return (
                <Checkbox
                    className="ml-3"
                    checked={user.admin}
                    disabled={user.me}
                    onCheckedChange={(value) => setAdmin(row.getValue('id'), !!value)}
                    aria-label="Select row"
                />
            )
        },
    },
]
