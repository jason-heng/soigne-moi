import Link from 'next/link'
import TabsLayout from './_components/TabsLayout'

export default function AuthPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const tab = searchParams?.tab === "signup" ? "signup" : "login"

    return (
        <main className='flex justify-center items-center h-screen'>
            <div className='flex flex-col items-center shadow-2xl rounded-lg p-5'>
                <Link href="/" className='text-primary text-xl font-bold mb-5'><h1>SoigneMoi</h1></Link>
                <h2 className='text-2xl font-bold'>Bienvenue !</h2>
                <p className='text-center text-muted-foreground'>Heureux de vous voir<br /> parmi nous !</p>
                <TabsLayout tab={tab} />
            </div>
        </main>
    )
}
