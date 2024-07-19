import { getSecretaries } from "@/_data/secretaries"
import { columns } from "./_components/Columns"
import { DataTable } from "./_components/DataTable"
import { NewSecretary } from "./_components/NewSecretary"

export default async function SecretariesPage() {
  const data = await getSecretaries()

  return (
    <div className="flex-1 flex flex-col p-8 h-screen">
      <h1 className='text-xl mb-5'>Géstion des secrétaires</h1>
      <div className="flex h-full gap-5">
        <DataTable columns={columns} data={data} />
        <NewSecretary />
      </div>
    </div>
  )
}
