import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card'
import Link from 'next/link'
import { StaysChart } from './_components/StaysChart'
import { countUsers, getUser } from '@/_data/users'
import { countDoctors } from '@/_data/doctors'
import { getStays } from '@/_data/stays'
import { Stay } from '@prisma/client'

export function PatientsCard({ patientsNumber }: { patientsNumber: number }) {
    return (
        <Card className='row-span-2 col-span-1 justify-between flex flex-col'>
            <CardHeader className='gap-4'>
                <CardTitle className='text-2xl'>Patients</CardTitle>
                <CardDescription className='text-xl'>
                    {patientsNumber || "Aucun"} patient{patientsNumber > 1 && "s"}
                </CardDescription>
            </CardHeader>
            <CardFooter className='self-end'>
                <Link href={"/admin/users"} className='text-white bg-primary p-2 rounded-md'>Voir plus</Link>
            </CardFooter>
        </Card>
    )
}

export function DoctorsCard({ doctorsNumber }: { doctorsNumber: number }) {
    return (
        <Card className='row-span-2 col-span-1 justify-between flex flex-col'>
            <CardHeader className='gap-4'>
                <CardTitle className='text-2xl'>Docteurs</CardTitle>
                <CardDescription className='text-xl'>
                    {doctorsNumber || "Aucun"} docteur{doctorsNumber > 1 && "s"}
                </CardDescription>
            </CardHeader>
            <CardFooter className='self-end'>
                <Link href={"/admin/doctors"} className='text-white bg-primary p-2 rounded-md'>Voir plus</Link>
            </CardFooter>
        </Card>
    )
}

export function SecretariesCard({ secretariesNumber }: { secretariesNumber: number }) {
    return (
        <Card className='row-span-2 col-span-1 justify-between flex flex-col'>
            <CardHeader className='gap-4'>
                <CardTitle className='text-2xl'>Secrétaires</CardTitle>
                <CardDescription className='text-xl'>
                    {secretariesNumber || "Aucune"} secrétaire{secretariesNumber > 1 && "s"}
                </CardDescription>
            </CardHeader>
            <CardFooter className='self-end'>
                <Link href={"/admin/secretaries"} className='text-white bg-primary p-2 rounded-md'>Voir plus</Link>
            </CardFooter>
        </Card>
    )
}

export function StaysEvolutionCard({ stays }: { stays: Stay[] }) {
    return (
        <Card className='row-span-3 col-span-2'>
            <CardHeader>
                <CardTitle className='text-2xl mx-auto'>Evolution des séjours</CardTitle>
            </CardHeader>
            <CardContent className='flex justify-center items-center'>
                <StaysChart stays={stays} />
            </CardContent>
        </Card>
    )
}

export function StaysCard({ stays }: { stays: Stay[] }) {
    const endedStaysNumber = stays.filter(stay => new Date(stay.end) < new Date()).length
    const ongoingStaysNumber = stays.filter(stay => new Date(stay.start) <= new Date() && new Date(stay.end) >= new Date()).length
    const upcomingStaysNumber = stays.filter(stay => new Date(stay.start) > new Date()).length
    const thisMonthStaysNumber = stays.filter(stay => new Date(stay.start).getMonth() === new Date().getMonth() && new Date(stay.start).getFullYear() === new Date().getFullYear()).length
    const totalStaysNumber = stays.length

    return (
        <Card className='row-span-3 col-span-1'>
            <CardHeader className='gap-2'>
                <CardTitle className='text-2xl'>Séjours</CardTitle>
                <CardDescription className='text-xl'>
                    {`Passés: ${endedStaysNumber || "Aucun"} séjour${endedStaysNumber > 1 ? "s" : ""}`}
                </CardDescription>
                <CardDescription className='text-xl'>
                    {`En cours: ${ongoingStaysNumber || "Aucun"} séjour${ongoingStaysNumber > 1 ? "s" : ""}`}
                </CardDescription>
                <CardDescription className='text-xl'>
                    {`A venir: ${upcomingStaysNumber || "Aucun"} séjour${upcomingStaysNumber > 1 ? "s" : ""}`}
                </CardDescription>
                <CardDescription className='text-xl'>
                    {`Ce mois: ${thisMonthStaysNumber || "Aucun"} séjour${thisMonthStaysNumber > 1 ? "s" : ""}`}
                </CardDescription>
                <CardDescription className='text-xl'>
                    {`Au total: ${totalStaysNumber || "Aucun"} séjour${totalStaysNumber > 1 ? "s" : ""}`}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

export default async function AdminHome() {
    const user = await getUser()

    const patientsNumber = await countUsers({ where: { admin: false } })
    const doctorsNumber = await countDoctors()
    const secretariesNumber = await countDoctors()
    const stays = await getStays()

    return (
        <div className='flex flex-col flex-1 p-5 gap-5'>
            <h1 className='text-xl'>Bonjour, {user?.firstName} !</h1>
            <div className='grid grid-cols-3 grid-rows-5 gap-5 flex-1'>
                <PatientsCard patientsNumber={patientsNumber} />
                <DoctorsCard doctorsNumber={doctorsNumber} />
                <SecretariesCard secretariesNumber={secretariesNumber} />
                <StaysEvolutionCard stays={stays} />
                <StaysCard stays={stays} />
            </div>
        </div>
    )
}