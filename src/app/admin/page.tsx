import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card'
import prisma from '@/_lib/db'
import Link from 'next/link'
import { StaysChart } from './_components/StaysChart'

export default async function page() {
    const doctorsNumber = await prisma.doctor.count()
    const secretariesNumber = await prisma.secretary.count()
    const patientsNumber = await prisma.user.count({ where: { admin: false } })

    const stays = await prisma.stay.findMany()

    const endedStaysNumber = stays.filter(stay => new Date(stay.end) < new Date()).length
    const ongoingStaysNumber = stays.filter(stay => new Date(stay.start) <= new Date() && new Date(stay.end) >= new Date()).length
    const upcomingStaysNumber = stays.filter(stay => new Date(stay.start) > new Date()).length
    const thisMonthStaysNumber = stays.filter(stay => new Date(stay.start).getMonth() === new Date().getMonth() && new Date(stay.start).getFullYear() === new Date().getFullYear()).length
    const totalStaysNumber = stays.length

    return (
        <div className='grid grid-cols-3 grid-rows-5 p-5 gap-5 w-[100%] max-h-[100svh]'>
            <Card className='row-span-2 col-span-1 justify-between flex flex-col'>
                <CardHeader className='gap-4'>
                    <CardTitle className='text-2xl'>Patients</CardTitle>
                    <CardDescription className='text-xl'>
                        {patientsNumber} patient{patientsNumber !== 1 && "s"}
                    </CardDescription>
                </CardHeader>
                <CardFooter className='self-end'>
                    <Link href={"/admin/users"} className='text-white bg-primary p-2 rounded-md'>Voir plus</Link>
                </CardFooter>
            </Card>
            <Card className='row-span-2 col-span-1 justify-between flex flex-col'>
                <CardHeader className='gap-4'>
                    <CardTitle className='text-2xl'>Docteurs</CardTitle>
                    <CardDescription className='text-xl'>
                        {doctorsNumber} docteur{doctorsNumber !== 1 && "s"}
                    </CardDescription>
                </CardHeader>
                <CardFooter className='self-end'>
                    <Link href={"/admin/doctors"} className='text-white bg-primary p-2 rounded-md'>Voir plus</Link>
                </CardFooter>
            </Card>
            <Card className='row-span-2 col-span-1 justify-between flex flex-col'>
                <CardHeader className='gap-4'>
                    <CardTitle className='text-2xl'>Secrétaires</CardTitle>
                    <CardDescription className='text-xl'>
                        {secretariesNumber} secrétaire{secretariesNumber !== 1 && "s"}
                    </CardDescription>
                </CardHeader>
                <CardFooter className='self-end'>
                    <Link href={"/admin/secretaries"} className='text-white bg-primary p-2 rounded-md'>Voir plus</Link>
                </CardFooter>
            </Card>
            <Card className='row-span-3 col-span-2'>
                <CardHeader>
                    <CardTitle className='text-2xl mx-auto'>Evolution des séjours</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-center items-center'>
                    <StaysChart stays={stays} />
                </CardContent>
            </Card>
            <Card className='row-span-3 col-span-1'>
                <CardHeader className='gap-2'>
                    <CardTitle className='text-2xl'>Séjours</CardTitle>
                    <CardDescription className='text-xl'>
                        Passés: {endedStaysNumber || "Aucun"} séjour{endedStaysNumber > 1 && "s"}
                    </CardDescription>
                    <CardDescription className='text-xl'>
                        En cours: {ongoingStaysNumber || "Aucun"} séjour{ongoingStaysNumber > 1 && "s"}
                    </CardDescription>
                    <CardDescription className='text-xl'>
                        A venir: {upcomingStaysNumber || "Aucun"} séjour{upcomingStaysNumber > 1 && "s"}
                    </CardDescription>
                    <CardDescription className='text-xl'>
                        Ce mois: {thisMonthStaysNumber || "Aucun"} séjour{thisMonthStaysNumber > 1 && "s"}
                    </CardDescription>
                    <CardDescription className='text-xl'>
                        Au total: {totalStaysNumber || "Aucun"} séjour{totalStaysNumber > 1 && "s"}
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
