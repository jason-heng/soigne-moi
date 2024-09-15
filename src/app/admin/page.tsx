import { countDoctors } from '@/data/doctors'
import { getStays } from '@/data/stays'
import { countUsers, getUser } from '@/data/users'
import { DoctorsCard, PatientsCard, SecretariesCard, StaysCard, StaysEvolutionCard } from './components'

export default async function AdminHome() {
    const user = await getUser()

    const patientsNumber = await countUsers({ where: { admin: false } })
    const doctorsNumber = await countDoctors()
    const secretariesNumber = await countDoctors()
    const stays = await getStays()

    return (
        <div className='flex flex-col flex-1 p-5 gap-5'>
            <h1 className='text-xl'>Bonjour, {user?.firstName} !</h1>
            <div className='grid grid-cols-5 grid-rows-5 lg:grid-cols-3 lg:grid-rows-5 gap-5 flex-1'>
                <PatientsCard patientsNumber={patientsNumber} />
                <DoctorsCard doctorsNumber={doctorsNumber} />
                <SecretariesCard secretariesNumber={secretariesNumber} />
                <StaysEvolutionCard stays={stays} />
                <StaysCard stays={stays} />
            </div>
        </div>
    )
}