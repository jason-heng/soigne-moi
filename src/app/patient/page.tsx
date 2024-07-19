import { NewStay } from '@/app/patient/_components/NewStay'
import { getDoctors } from '@/_data/doctors'
import { getCurrentStay, getIncomingStay } from '@/_data/stays'
import { getUser } from '@/_data/users'
import { CurrentStay } from './_components/CurrentStay'
import { IncomingStay } from './_components/IncomingStay'
import { CurrentPrescription } from './_components/CurrentPrescription'

export default async function PatientHome() {
    const user = await getUser()

    const currentStay = await getCurrentStay()
    const incomingStay = await getIncomingStay()
    const doctors = await getDoctors()

    return (
        <div className='flex-1 p-8 h-screen'>
            <h1 className='text-xl'>Bonjour, {user.firstName} !</h1>
            <div className='flex flex-1 gap-5 h-[90%] mt-5'>
                <div className='flex flex-col gap-5 h-[100%] min-w-[350px]'>
                    <CurrentStay stay={currentStay} />
                    <IncomingStay stay={incomingStay} />
                </div>
                <CurrentPrescription stay={currentStay} />
                <NewStay doctors={doctors} disabled={!!currentStay || !!incomingStay} />
            </div >
        </div >
    )
}