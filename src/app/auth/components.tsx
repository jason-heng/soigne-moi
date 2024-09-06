"use client"

import SubmitButton from "@/_components/submit-button"
import { Input } from "@/_components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_components/ui/tabs"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"
import { login, signup } from "./actions"

export function TabsLayout({ tab }: { tab: "signup" | "login" }) {
    const router = useRouter()

    return (
        <Tabs value={tab} onValueChange={tab => router.push(`/auth?tab=${tab}`)} className='flex flex-col justify-center items-center gap-5 mt-4'>
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
    )
}

export function LoginForm() {
    const [state, action] = useFormState(login, null)

    return (
        <form className='flex flex-col gap-4 w-[310px]' action={action}>
            <div>
                <Input type="email" placeholder="Email" name="email" />
                {state?.errors?.email && <p className='text-sm text-destructive'>{state?.errors.email}</p>}
            </div>
            <div>
                <Input type="password" placeholder="Mot de passe" name="password" />
                {state?.errors?.password && <p className='text-sm text-destructive'>{state?.errors.password}</p>}
            </div>
            <SubmitButton className='mt-2'>Se Connecter</SubmitButton>
        </form>
    )
}

export function SignupForm() {
    const [state, action] = useFormState(signup, null)

    return (
        <form className='flex flex-col gap-4 w-[310px]' action={action}>
            <div className='flex gap-2'>
                <div>
                    <Input type="text" placeholder="Nom" name='lastName' className="placeholder:text-xs" />
                    {state?.errors?.lastName && <p className='text-sm text-destructive'>{state.errors.lastName}</p>}
                </div>
                <div>
                    <Input type="text" placeholder="Prénom" name='firstName' className="placeholder:text-xs" />
                    {state?.errors?.firstName && <p className='text-sm text-destructive'>{state.errors.firstName}</p>}
                </div>
            </div>
            <div >
                <Input type="email" placeholder="Email" name='email' className="placeholder:text-xs" />
                {state?.errors?.email && <p className='text-sm text-destructive'>{state.errors.email}</p>}
            </div >
            <div>
                <Input type="text" placeholder="Adresse" name='address' className="placeholder:text-xs" />
                {state?.errors?.address && <p className='text-sm text-destructive'>{state.errors.address}</p>}
            </div>
            <div className='flex gap-2'>
                <div>
                    <Input type="password" placeholder="Mot de passe" name='password' className="placeholder:text-xs" />
                    {state?.errors?.password && <p className='text-sm text-destructive'>{state.errors.password}</p>}
                </div>
                <div >
                    <Input type="password" placeholder="Répéter mot de passe" name='repeatPassword' className="placeholder:text-xs" />
                    {state?.errors?.repeatPassword && <p className='text-sm text-destructive'>{state.errors.repeatPassword}</p>}
                </div>
            </div>
            <SubmitButton className='mt-2'>S&apos;inscrire</SubmitButton>
        </form>
    )
}