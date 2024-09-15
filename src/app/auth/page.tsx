import { Card, CardContent, CardHeader } from '@/_components/ui/card'
import Link from 'next/link'
import { TabsLayout } from './components'

export default function AuthPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const tab = searchParams?.tab === "signup" ? "signup" : "login"

    return (
        <main className='flex justify-center items-center h-screen'>
            <Card className='flex flex-col shadow-xl p-2'>
                <CardHeader className='items-center p-3'>
                    <Link href="/" className='text-primary text-xl font-bold'>SoigneMoi</Link>
                    <h2 className='text-2xl font-bold'>Bienvenue !</h2>
                </CardHeader>
                <CardContent>
                    <TabsLayout tab={tab} />
                </CardContent>
            </Card>
        </main>
    )
}
