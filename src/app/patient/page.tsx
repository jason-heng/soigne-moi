import { NewStay } from '@/components/patient/home/NewStay'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SessionUser, getSession } from '@/lib/auth'
import { getDoctors } from '@/lib/doctors'
import { getCurrentStay, getIncomingStay } from '@/lib/stays'
import { formatDate } from '@/lib/utils'
import { redirect } from 'next/navigation'

function CurrentStay({ stay }: { stay: Awaited<ReturnType<typeof getCurrentStay>> }) {
    return (
        <Card className='shadow-xl'>
            <CardHeader className='pb-2 space-y-0'>
                <CardTitle className='text-xl text-primary'>Séjour actuel</CardTitle>
                {stay && <CardDescription>{formatDate(stay.start)} - {formatDate(stay.end)}</CardDescription>}
            </CardHeader>
            <CardContent>
                {stay ?
                    <>
                        <p><span className='font-semibold'>Motif:</span> <span className='text-muted-foreground'>{stay.reason}</span></p>
                        <p><span className='font-semibold'>Docteur:</span> <span className='text-muted-foreground'>{stay.doctor.firstName} {stay.doctor.lastName}</span></p>
                        <p><span className='font-semibold'>Spécialité:</span> <span className='text-muted-foreground'>{stay.doctor.speciality}</span></p>
                    </> :
                    <p className='text-muted-foreground'>Aucun séjour en cours</p>
                }
            </CardContent>
        </Card>
    )
}

function IncomingStay({ stay }: { stay: Awaited<ReturnType<typeof getIncomingStay>> }) {
    return (
        <Card className='shadow-xl'>
            <CardHeader className='pb-2'>
                <CardTitle className='text-xl text-primary'>Séjours a venir</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3' >
                {stay ?
                    <Card className='shadow-xl' >
                        <CardHeader className='pb-2 space-y-0'>
                            <CardTitle className='text-xl'>{stay.reason}</CardTitle>
                            <CardDescription>{formatDate(stay.start)} - {formatDate(stay.end)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p><span className='font-semibold'>Docteur:</span> <span className='text-muted-foreground'>{stay.doctor.firstName} {stay.doctor.lastName}</span></p>
                            <p><span className='font-semibold'>Spécialité:</span> <span className='text-muted-foreground'>{stay.doctor.speciality}</span></p>
                        </CardContent>
                    </Card> :
                    <p className='text-muted-foreground'>Aucun séjour a venir</p>
                }
            </CardContent>
        </Card>
    )
}

function CurrentPrescription({ stay }: { stay: Awaited<ReturnType<typeof getCurrentStay>> }) {
    return (
        <Card className='flex-grow min-w-[350px] overflow-y-auto relative space-y-3 shadow-xl'>
            <CardHeader className='pb-2 sticky top-0 bg-background'>
                <CardTitle className='text-xl text-primary'>Préscription actuelle</CardTitle>
                {stay?.prescription && <CardDescription>{formatDate(stay.prescription.start)} - {formatDate(stay.prescription.end)}</CardDescription>}
            </CardHeader>
            <CardContent className='space-y-3' >
                {stay ?
                    stay.prescription ?
                        stay.prescription.drugs.length ? stay.prescription.drugs.map(drug => (
                            <Card className='shadow-xl' key={drug.id} >
                                <CardHeader>
                                    <CardTitle className='text-xl'>{drug.name}</CardTitle>
                                    <CardDescription>{drug.dosage}</CardDescription>
                                </CardHeader>
                            </Card>
                        )) :
                            <p className='text-muted-foreground text-center'>Aucun medicament pour l&apos;instant</p>
                        :
                        <p className='text-muted-foreground text-center'>Aucune prescription en cours</p>
                    :
                    <p className='text-muted-foreground text-center'>Aucun séjour en cours</p>
                }
            </CardContent>
        </Card>
    )
}

export default async function Dashboard() {
    const session = await getSession()

    if (!session) redirect('/auth')

    const user = (session.user as SessionUser)

    const currentStay = await getCurrentStay(user.id)
    const incomingStay = await getIncomingStay(user.id)
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
                <NewStay userId={user.id} doctors={doctors} disabled={!!currentStay && !!incomingStay} />
            </div >
        </div >
    )
}