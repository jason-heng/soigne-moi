"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_components/ui/tabs'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { LoginForm } from './_components/LoginForm'
import { SignupForm } from './_components/SignupForm'

export default function AuthPage() {
    const searchParams = useSearchParams()
    const directTab = searchParams.get('tab')

    const [tab, setTab] = useState(directTab === "signup" ? "signup" : "login")

    return (
        <main className='flex justify-center items-center h-screen'>
            <div className='flex flex-col items-center shadow-2xl rounded-lg p-5'>
                <h1 className='text-primary text-xl font-bold mb-5'>SoigneMoi</h1>
                <h1 className='text-2xl font-bold'>Bienvenue !</h1>
                <h3 className='text-center text-muted-foreground'>Heureux de vous {tab === "login" ? "revoir" : "accueillir"}<br />parmi nous !</h3>
                <Tabs value={tab} onValueChange={value => setTab(value)} className='flex flex-col justify-center items-center gap-5 m-5 w-[350px]'>
                    <TabsList className='w-[200px]'>
                        <TabsTrigger value="login">Connexion</TabsTrigger>
                        <TabsTrigger value="signup">Inscription</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="signup">
                        <SignupForm />
                    </TabsContent>
                </Tabs></div>
        </main>
    )
}
