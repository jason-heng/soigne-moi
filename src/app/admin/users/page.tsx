import { DataTable } from "@/components/ui/data-table"
import { getUser, getUsers } from "@/data/users"
import { usersColumns } from "./columns"

export default async function AdminUsersPage() {
  const data = await getUsers()
  const myself = await getUser()

  return (
    <div className="flex-1 flex flex-col p-8 h-screen">
      <h1 className='text-xl mb-5'>Géstion des utilisateurs</h1>
      <DataTable columns={usersColumns} data={data.map(user => ({ ...user, me: myself.id === user.id }))} notFoundPlaceholder="Aucun utilisateur." />
    </div>
  )
}
