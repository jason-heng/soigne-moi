import { getMyStays } from '@/_data/stays'
import { HistoryCard } from '@/app/patient/history/_components/HistoryCard'

export default async function PatientHistory() {
    const stays = await getMyStays()

    return <HistoryCard stays={stays} />
}