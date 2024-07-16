import { HistoryCard } from '@/app/patient/history/HistoryTabs'
import { getStays } from '@/_data/stays'


export default async function History() {
    const stays = await getStays()

    return <HistoryCard stays={stays} />
}


