import { HistoryCard } from '@/components/patient/history/HistoryTabs'
import { SessionUser, getSession } from '@/lib/auth'
import { getStays } from '@/lib/stays'
import { redirect } from 'next/navigation'


export default async function History() {
    const session = await getSession()

    if (!session) redirect('/auth')

    const user = (session.user as SessionUser)

    const stays = await getStays(user.id)

    return <HistoryCard stays={stays} />
}


