import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import { formatDate } from "@/_lib/utils";
import { IncomingStay } from "../data";

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