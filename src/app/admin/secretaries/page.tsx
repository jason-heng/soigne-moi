import { getSecretaries } from "@/_data/secretaries"
import AddSecretaryForm from "./_components/AddSecretaryForm"
import { secretariesColumns } from "./_components/SecretariesColumns"
import { SecretariesDataTable } from "./_components/SecretariesDataTable"

export default async function SecretariesPage() {
  const secretaries = await getSecretaries()

  return (
    <div className="flex-1 flex p-5 flex-col gap-5">
      <h1 className='text-xl'>Géstion des secrétaires</h1>
      <div className="flex flex-1 lg:flex-row flex-col  gap-5 min-h-0">
        <SecretariesDataTable data={secretaries} columns={secretariesColumns} />
        <AddSecretaryForm />
      </div>
    </div>
  )
}
