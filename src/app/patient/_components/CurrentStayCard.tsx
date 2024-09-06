import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import { formatDate } from "@/_lib/utils";
import { CurrentStay } from "../data";

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



