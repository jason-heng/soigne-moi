import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card"
import { Stay } from "@prisma/client"
import Link from "next/link"
import { StaysChart } from "./stays-chart"

export function PatientsCard({ patientsNumber }: { patientsNumber: number }) {
    return (
        <Card className='row-start-1 row-end-2 col-start-1 col-end-3 lg:row-span-2 lg:col-span-1'>
            <CardHeader className='lg:gap-4'>
                <CardTitle className='lg:text-2xl'>Patients</CardTitle>
                <CardDescription className='lg:text-xl'>
                    {patientsNumber || "Aucun"} patient{patientsNumber > 1 && "s"}
                </CardDescription>
            </CardHeader>
            <CardFooter className='flex justify-end'>
                <Link href={"/admin/users"} className='text-white bg-primary p-2 rounded-md text-sm lg:text-md'>Voir plus</Link>
            </CardFooter>
        </Card>
    )
}

export function DoctorsCard({ doctorsNumber }: { doctorsNumber: number }) {
    return (
        <Card className='row-start-2 row-end-3 col-start-1 col-end-3 lg:row-span-2 lg:col-span-1'>
            <CardHeader className='lg:gap-4'>
                <CardTitle className='lg:text-2xl'>Docteurs</CardTitle>
                <CardDescription className='lg:text-xl'>
                    {doctorsNumber || "Aucun"} docteur{doctorsNumber > 1 && "s"}
                </CardDescription>
            </CardHeader>
            <CardFooter className='flex justify-end'>
                <Link href={"/admin/doctors"} className='text-white bg-primary p-2 rounded-md text-sm lg:text-md'>Voir plus</Link>
            </CardFooter>
        </Card>
    )
}

export function SecretariesCard({ secretariesNumber }: { secretariesNumber: number }) {
    return (
        <Card className='row-start-3 row-end-4 col-start-1 col-end-3 lg:row-span-2 lg:col-span-1'>
            <CardHeader className='lg:gap-4'>
                <CardTitle className='lg:text-2xl'>Secrétaires</CardTitle>
                <CardDescription className='lg:text-xl'>
                    {secretariesNumber || "Aucune"} secrétaire{secretariesNumber > 1 && "s"}
                </CardDescription>
            </CardHeader>
            <CardFooter className='flex justify-end'>
                <Link href={"/admin/secretaries"} className='text-white bg-primary p-2 rounded-md text-sm lg:text-md'>Voir plus</Link>
            </CardFooter>
        </Card>
    )
}

export function StaysEvolutionCard({ stays }: { stays: Stay[] }) {
    return (
        <Card className='row-span-2 col-span-5 lg:row-span-3 lg:col-span-2'>
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
        <Card className='row-start-1 row-end-4 col-start-3 col-end-6 lg:row-span-3 lg:col-span-1'>
            <CardHeader className='gap-5 lg:gap-2'>
                <CardTitle className='text-2xl'>Séjours</CardTitle>
                <CardDescription className='text-md lg:text-xl'>
                    {`Passés: ${endedStaysNumber || "Aucun"} séjour${endedStaysNumber > 1 ? "s" : ""}`}
                </CardDescription>
                <CardDescription className='text-md lg:text-xl'>
                    {`En cours: ${ongoingStaysNumber || "Aucun"} séjour${ongoingStaysNumber > 1 ? "s" : ""}`}
                </CardDescription>
                <CardDescription className='text-md lg:text-xl'>
                    {`A venir: ${upcomingStaysNumber || "Aucun"} séjour${upcomingStaysNumber > 1 ? "s" : ""}`}
                </CardDescription>
                <CardDescription className='text-md lg:text-xl'>
                    {`Ce mois: ${thisMonthStaysNumber || "Aucun"} séjour${thisMonthStaysNumber > 1 ? "s" : ""}`}
                </CardDescription>
                <CardDescription className='text-md lg:text-xl'>
                    {`Au total: ${totalStaysNumber || "Aucun"} séjour${totalStaysNumber > 1 ? "s" : ""}`}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}