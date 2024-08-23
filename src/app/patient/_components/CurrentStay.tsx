import { getCurrentStay } from "@/_data/stays";
import { cn, formatDate } from "@/_lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";

export function CurrentStay({ stay }: { stay: Awaited<ReturnType<typeof getCurrentStay>> }) {
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
                        <p><span className='font-semibold'>Docteur:</span> <span className='text-muted-foreground'>{stay.doctor.firstName} {stay.doctor.lastName}</span></p>
                        <p><span className='font-semibold'>Spécialité:</span> <span className='text-muted-foreground'>{stay.doctor.speciality}</span></p>
                    </> :
                    <p className='text-muted-foreground'>Aucun séjour en cours</p>
                }
            </CardContent>
        </Card>
    )
}



