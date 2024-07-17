import { HistoryCard } from '@/app/patient/history/_components/HistoryCard'
import { getStays } from '@/_data/stays'


export default async function PatientHistory() {
    const stays = await getStays()

    return <HistoryCard stays={stays} />
}


