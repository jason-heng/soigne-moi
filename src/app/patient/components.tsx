import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import { formatDate } from "@/_lib/utils";
import { CurrentStay, IncomingStay } from "./data";

export function CurrentPrescriptionCard({ stay }: { stay: CurrentStay }) {
    return (
        <Card className='overflow-y-auto relative space-y-3 shadow-xl'>
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
                            <p className='text-muted-foreground text-center'>Aucun médicament pour l&apos;instant</p>
                        :
                        <p className='text-muted-foreground text-center'>Aucune préscription en cours</p>
                    :
                    <p className='text-muted-foreground text-center'>Aucun séjour en cours</p>
                }
            </CardContent>
        </Card>
    )
}

export function CurrentStayCard({ stay }: { stay: CurrentStay }) {
    return (
        <Card className='col-span-1 shadow-xl'>
            <CardHeader className='pb-2 space-y-0'>
                <CardTitle className='text-xl text-primary'>Séjour actuel</CardTitle>
                {stay && <CardDescription>{formatDate(stay.start)} - {formatDate(stay.end)}</CardDescription>}
            </CardHeader>
            <CardContent>
                {stay ?
                    <>
                        <p><span className='font-semibold'>Motif:</span> <span className='text-muted-foreground'>{stay.reason}</span></p>
                        <p><span className='font-semibold'>Spécialité:</span> <span className='text-muted-foreground'>{stay.doctor.speciality}</span></p>
                        <p><span className='font-semibold'>Docteur:</span> <span className='text-muted-foreground'>{stay.doctor.firstName} {stay.doctor.lastName}</span></p>
                    </> :
                    <p className='text-muted-foreground'>Aucun séjour en cours</p>
                }
            </CardContent>
        </Card>
    )
}

export function IncomingStayCard({ stay }: { stay: IncomingStay }) {
    return (
        <Card className='col-span-1 shadow-xl'>
            <CardHeader className='pb-2'>
                <CardTitle className='text-xl text-primary'>Séjour a venir</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3' >
                {stay ?
                    <Card className='shadow-xl' >
                        <CardHeader className='pb-2 space-y-0'>
                            <CardTitle className='text-xl'>{stay.reason}</CardTitle>
                            <CardDescription>{formatDate(stay.start)} - {formatDate(stay.end)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p><span className='font-semibold'>Spécialité:</span> <span className='text-muted-foreground'>{stay.doctor.speciality}</span></p>
                            <p><span className='font-semibold'>Docteur:</span> <span className='text-muted-foreground'>{stay.doctor.firstName} {stay.doctor.lastName}</span></p>
                        </CardContent>
                    </Card> :
                    <p className='text-muted-foreground'>Aucun séjour a venir</p>
                }
            </CardContent>
        </Card>
    )
}