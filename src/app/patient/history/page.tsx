import { getMyStays } from '@/data/stays'
import { HistoryCard } from './history-card'

export default async function PatientHistory() {
    const stays = await getMyStays()

    return <HistoryCard stays={stays} />
}