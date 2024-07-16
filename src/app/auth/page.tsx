"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useActionState, useState } from 'react'
import { login, signup } from './actions'
import { useFormState } from 'react-dom'

function SignupForm({ setTab }: { setTab: Dispatch<SetStateAction<string>> }) {
    const [state, action] = useFormState(signup, null)

    return (
        <form className='flex flex-col gap-4 w-[380px]' action={action}>
            <div className='flex gap-2'>
                <div>
                    <Input type="text" placeholder="Nom" name='lastName' id='lastName' />
                    {state?.errors.lastName && <p className='text-sm text-destructive'>{state.errors.lastName}</p>}
                </div>
                <div>
                    <Input type="text" placeholder="Prénom" name='firstName' id='firstName' />
                    {state?.errors.firstName && <p className='text-sm text-destructive'>{state.errors.firstName}</p>}
                </div>
            </div>
            <div >
                <Input type="email" placeholder="Email" name='email' id='email' />
                {state?.errors.email && <p className='text-sm text-destructive'>{state.errors.email}</p>}
            </div >
            <div>
                <Input type="text" placeholder="Adresse" name='address' id='address' />
                {state?.errors.address && <p className='text-sm text-destructive'>{state.errors.address}</p>}
            </div>
            <div className='flex gap-2'>
                <div>
                    <Input type="password" placeholder="Mot de passe" name='password' id='password' />
                    {state?.errors.password && <p className='text-sm text-destructive'>{state.errors.password}</p>}
                </div>
                <div >
                    <Input type="password" placeholder="Répéter mot de passe" name='repeatPassword' id='repeatPassword' />
                    {state?.errors.repeatPassword && <p className='text-sm text-destructive'>{state.errors.repeatPassword}</p>}
                </div>
            </div>
            <Button className='mt-2'>{"S'inscrire"}</Button>
        </form>
    )
}

function LoginForm() {
    const [state, action] = useFormState(login, null)

    return (
        <form className='flex flex-col gap-4' action={action}>
            <div>
                <Input type="email" placeholder="Email" name="email" id='email' />
                {state?.errors?.email && <p className='text-sm text-destructive'>{state?.errors.email}</p>}
            </div>
            <div>
                <Input type="password" placeholder="Mot de passe" name="password" id='password' />
                {state?.errors?.password && <p className='text-sm text-destructive'>{state?.errors.password}</p>}
            </div>
            <Button className='mt-2'>Se Connecter</Button>
        </form>
    )
}

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
                        <SignupForm setTab={setTab} />
                    </TabsContent>
                </Tabs></div>
        </main>
    )
}
