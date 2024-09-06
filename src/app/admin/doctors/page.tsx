import { getDoctors } from '@/_data/doctors'
import AddDoctorForm from './_components/AddDoctorForm'
import DoctorsList from './_components/DoctorsList'

export default async function page() {
  const doctors = await getDoctors()

  return (
    <div className="flex-1 flex p-5 flex-col gap-5">
      <h1 className='text-xl'>Géstion des docteurs</h1>
      <div className="flex flex-1 flex-col lg:flex-row gap-5 min-h-0">
        <DoctorsList doctors={doctors} />
        <AddDoctorForm />
      </div>
    </div>
  )
}
