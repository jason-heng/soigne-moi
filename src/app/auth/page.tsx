"use client"

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'

function SignupForm() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
                <Input type="text" placeholder="Nom" />
                <Input type="text" placeholder="Prénom" />
            </div>
            <Input type="email" placeholder="Email" />
            <Input type="text" placeholder="Adresse" />
            <div className='flex gap-2'>
                <Input type="password" placeholder="Mot de passe" />
                <Input type="password" placeholder="Répéter mot de passe" />
            </div>
            <Button className='mt-2'>S&apos;inscrire</Button>
        </div>
    )
}

function LoginForm() {
    return (
        <div className='flex flex-col gap-4'>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Mot de passe" />
            <div className="flex items-center space-x-2">
                <Checkbox id="stay-connected" />
                <Label htmlFor="stay-connected">Rester Connecter</Label>
            </div>
            <Button className='mt-2'>Se Connecter</Button>
        </div>
    )
}

export default function AuthPage() {
    const [tab, setTab] = useState("login")

    return (
        <main className='flex justify-center items-center  h-screen'>
            <div className='flex flex-col items-center shadow-2xl rounded-lg p-2 py-10'>
            <h1 className='text-primary text-xl font-bold mb-5'>SoigneMoi</h1>
                <h1 className='text-2xl font-bold'>Bienvenue !</h1>
                <h3 className='opacity-80 text-center'>Heureux de vous {tab === "login" ? "revoir" : "accueillir"}<br />parmi nous !</h3>
                <Tabs defaultValue="login" onValueChange={value => setTab(value)} className='flex flex-col justify-center items-center gap-5 m-5 w-[350px]'>
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
