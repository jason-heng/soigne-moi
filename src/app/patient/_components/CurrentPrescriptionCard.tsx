import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import { formatDate } from "@/_lib/utils";
import { CurrentStay } from "../data";

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