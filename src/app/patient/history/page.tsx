import { HistoryCard } from '@/app/patient/history/_components/HistoryCard'
import { getMyStays } from '@/_data/stays'

export default async function PatientHistory() {
    const stays = await getMyStays()

    return <HistoryCard stays={stays} />
}