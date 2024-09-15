import { DataTable } from "@/components/ui/data-table"
import { getSecretaries } from "@/data/secretaries"
import { AddSecretaryForm } from "./add-secretary-form"
import { secretariesColumns } from "./columns"

export default async function SecretariesPage() {
  const secretaries = await getSecretaries()

  return (
    <div className="flex-1 flex p-5 flex-col gap-5">
      <h1 className='text-xl'>Géstion des secrétaires</h1>
      <div className="flex flex-1 lg:flex-row flex-col  gap-5 min-h-0">
        <DataTable data={secretaries} columns={secretariesColumns} notFoundPlaceholder="Aucune secrétaire." />
        <AddSecretaryForm />
      </div>
    </div>
  )
}
