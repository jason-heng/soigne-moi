import { getSecretaries } from "@/_data/secretaries"
import { secretariesColumns } from "./_components/SecretariesColumns"
import { SecretariesTable } from "./_components/SecretariesTable"
import AddSecretaryForm from "./_components/AddSecretaryForm"

export default async function SecretariesPage() {
  const secretaries = await getSecretaries()

  return (
    <div className="flex-1 flex p-5 flex-col gap-5">
      <h1 className='text-xl'>Géstion des secrétaires</h1>
      <div className="flex flex-1 gap-5 min-h-0">
        <SecretariesTable data={secretaries} columns={secretariesColumns} />
        <AddSecretaryForm />
      </div>
    </div>
  )
}
