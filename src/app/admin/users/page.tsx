import { usersColumns } from "./_components/UsersColumns"
import { UsersDataTable } from "./_components/UsersDataTable"
import { getUser, getUsers } from "@/_data/users"

export default async function AdminUsersPage() {
  const data = await getUsers()

  const myself = await getUser()

  return (
    <div className="flex-1 flex flex-col p-8 h-screen">
      <h1 className='text-xl mb-5'>Géstion des utilisateurs</h1>
      <UsersDataTable columns={usersColumns} data={data.map(user => ({ ...user, me: myself.id === user.id }))} />
    </div>
  )
}
