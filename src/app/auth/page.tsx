import { Suspense } from 'react'
import Link from 'next/link'
import TabsLayout from './_components/TabsLayout'

export default function AuthPage() {
    return (
        <main className='flex justify-center items-center h-screen'>
            <div className='flex flex-col items-center shadow-2xl rounded-lg p-5'>
                <Link href="/"><h1 className='text-primary text-xl font-bold mb-5'>SoigneMoi</h1></Link>
                <h1 className='text-2xl font-bold'>Bienvenue !</h1>
                <h3 className='text-center text-muted-foreground'>Heureux de vous voir<br />parmi nous !</h3>
                <Suspense>
                    <TabsLayout />
                </Suspense>
            </div>
        </main>
    )
}
