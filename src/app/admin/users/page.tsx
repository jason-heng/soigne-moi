import { usersColumns } from "./_components/UsersColumns"
import { DataTable } from "./_components/UsersDataTable"
import { getUser, getUsers } from "@/_data/users"

export default async function UsersPage() {
  const data = await getUsers()

  const myself = await getUser()

  return (
    <div className="flex-1 flex flex-col p-8 h-screen">
      <h1 className='text-xl mb-5'>Géstion des utilisateurs</h1>
      <DataTable columns={usersColumns} data={data.map(user => ({ ...user, me: myself.id === user.id }))} />
    </div>
  )
}
