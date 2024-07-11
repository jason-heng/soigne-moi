import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

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
                <Input type="password" placeholder="Confirmer mdp" />
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
    return (
        <main className='flex justify-center items-center flex-col h-screen'>
            <h1 className='text-2xl font-bold'>Bienvenue !</h1>
            <h3 className='opacity-80 text-center'>Heureux de vus revoir<br />parmi nous !</h3>
            <Tabs defaultValue="login" className='flex flex-col justify-center items-center gap-5 m-5 w-[300px]'>
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
            </Tabs>
        </main>
    )
}
