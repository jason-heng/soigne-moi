import { AddStayForm } from '@/app/patient/_components/AddStayForm'
import { getUser } from '@/_data/users'
import { CurrentStayCard } from './_components/CurrentStayCard'
import { IncomingStayCard } from './_components/IncomingStayCard'
import { CurrentPrescriptionCard } from './_components/CurrentPrescriptionCard'
import { getCurrentStay, getDoctors, getIncomingStay } from './data'


export default async function PatientHome() {
    const user = await getUser()

    const currentStay = await getCurrentStay()
    const incomingStay = await getIncomingStay()
    const doctors = await getDoctors()

    return (
        <div className='flex-1 p-5'>
            <h1 className='text-xl'>Bonjour, {user?.firstName} !</h1>
            <div className='grid grid-cols-3 grid-rows-1 flex-1 gap-5 h-[90%] mt-5'>
                <div className='flex flex-col gap-5'>
                    <CurrentStayCard stay={currentStay} />
                    <IncomingStayCard stay={incomingStay} />
                </div>
                <CurrentPrescriptionCard stay={currentStay} />
                <AddStayForm doctors={doctors} disabled={!!currentStay || !!incomingStay} />
            </div>
        </div >
    )
}