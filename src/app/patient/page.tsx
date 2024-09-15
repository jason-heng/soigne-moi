import { getUser } from '@/data/users'
import { AddStayForm } from './add-stay-form'
import { CurrentPrescriptionCard, CurrentStayCard, IncomingStayCard } from './components'
import { getCurrentStay, getDoctors, getIncomingStay } from './data'

export default async function PatientHome() {
    const user = await getUser()

    const currentStay = await getCurrentStay()
    const incomingStay = await getIncomingStay()
    const doctors = await getDoctors()

    return (
        <div className='flex flex-col flex-1 p-5 gap-5'>
            <h1 className='text-xl'>Bonjour, {user?.firstName} !</h1>
            <div className='flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:grid-rows-1 flex-1 h-[90%]'>
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