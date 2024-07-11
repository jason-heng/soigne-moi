"use client"

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { login, signup } from '@/lib/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'

function SignupForm({ setTab }: { setTab: Dispatch<SetStateAction<string>> }) {
    const [firstNameError, setFirstNameError] = useState<string | null>(null)
    const [lastNameError, setLastNameError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [addressError, setAddressError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setFirstNameError(null);
        setLastNameError(null);
        setAddressError(null);
        setEmailError(null);
        setPasswordError(null);
        setRepeatPasswordError(null)

        const signupSchema = z.object({
            firstName: z.string().min(1, "Prénom invalide !"),
            lastName: z.string().min(1, "Nom invalide !"),
            address: z.string().min(1, "Adresse invalide !"),
            email: z.string().email("Email invalide !"),
            password: z.string().min(1, "Mot de passe invalide !"),
            repeatPassword: z.string()
        });

        const result = signupSchema.safeParse({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            repeatPassword: formData.get('repeatPassword'),
        });

        if (!result.success) {
            setFirstNameError(result.error.flatten().fieldErrors.firstName?.[0] ?? null);
            setLastNameError(result.error.flatten().fieldErrors.lastName?.[0] ?? null);
            setAddressError(result.error.flatten().fieldErrors.address?.[0] ?? null);
            setEmailError(result.error.flatten().fieldErrors.email?.[0] ?? null);
            setPasswordError(result.error.flatten().fieldErrors.password?.[0] ?? null);
            return
        }

        if (result.data.password !== result.data.repeatPassword) {
            setRepeatPasswordError("Mot de passes differents !")
            return
        }

        try {
            await signup(result.data.firstName, result.data.lastName, result.data.email, result.data.address, result.data.password)

            toast.success("Compte crée !")
            setTab("login")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <form className='flex flex-col gap-4' action={handleSubmit}>
            <div className='flex gap-2'>
                <div>
                    <Input type="text" placeholder="Nom" name='firstName' />
                    {firstNameError && <p className='text-sm text-destructive'>{firstNameError}</p>}
                </div>
                <div>
                    <Input type="text" placeholder="Prénom" name='lastName' />
                    {lastNameError && <p className='text-sm text-destructive'>{lastNameError}</p>}
                </div>
            </div>
            <div >
                <Input type="email" placeholder="Email" name='email' />
                {emailError && <p className='text-sm text-destructive'>{emailError}</p>}
            </div >
            <div>
                <Input type="text" placeholder="Adresse" name='address' />
                {addressError && <p className='text-sm text-destructive'>{addressError}</p>}
            </div>
            <div className='flex gap-2'>
                <div>
                    <Input type="password" placeholder="Mot de passe" name='password' />
                    {passwordError && <p className='text-sm text-destructive'>{passwordError}</p>}
                </div>
                <div >
                    <Input type="password" placeholder="Répéter mot de passe" name='repeatPassword' />
                    {repeatPasswordError && <p className='text-xs text-destructive'>{repeatPasswordError}</p>}
                </div>
            </div>
            <Button className='mt-2'>S&apos;inscrire</Button>
        </form>
    )
}

function LoginForm() {
    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setEmailError(null);
        setPasswordError(null);

        const signupSchema = z.object({
            email: z.string().email("Email invalide !"),
            password: z.string().min(1, "Mot de passe invalide !"),
        });

        const result = signupSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        if (!result.success) {
            setEmailError(result.error.flatten().fieldErrors.email?.[0] ?? null);
            setPasswordError(result.error.flatten().fieldErrors.password?.[0] ?? null);
            return
        }

        try {
            await login(result.data.email, result.data.password)

            toast.success("Connecté !")

            router.push('/dashboard');
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <form className='flex flex-col gap-4' action={handleSubmit}>
            <div>
                <Input type="email" placeholder="Email" name="email" />
                {emailError && <p className='text-sm text-destructive'>{emailError}</p>}
            </div>
            <div>
                <Input type="password" placeholder="Mot de passe" name="password" />
                {passwordError && <p className='text-sm text-destructive'>{passwordError}</p>}
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="stay-connected" name='stayLogged' />
                <Label htmlFor="stay-connected">Rester Connecter</Label>
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
        <main className='flex justify-center items-center  h-screen'>
            <div className='flex flex-col items-center shadow-2xl rounded-lg p-2 py-10'>
                <h1 className='text-primary text-xl font-bold mb-5'>SoigneMoi</h1>
                <h1 className='text-2xl font-bold'>Bienvenue !</h1>
                <h3 className='opacity-80 text-center'>Heureux de vous {tab === "login" ? "revoir" : "accueillir"}<br />parmi nous !</h3>
                <Tabs value={tab} onValueChange={value => setTab(value)} className='flex flex-col justify-center items-center gap-5 m-5 w-[350px]'>
                    <TabsList className='w-[200px]'>
                        <TabsTrigger value="login">Connexion</TabsTrigger>
                        <TabsTrigger value="signup">Inscription</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm/>
                    </TabsContent>
                    <TabsContent value="signup">
                        <SignupForm setTab={setTab} />
                    </TabsContent>
                </Tabs></div>
        </main>
    )
}
