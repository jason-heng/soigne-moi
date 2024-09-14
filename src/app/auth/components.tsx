"use client"

import { FieldError } from "@/_components/field-error"
import SubmitButton from "@/_components/submit-button"
import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_components/ui/tabs"
import { EMPTY_FORM_STATE } from "@/_lib/to-form-state"
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
    const [state, action] = useFormState(login, EMPTY_FORM_STATE)

    return (
        <form className='flex flex-col gap-4 w-[310px]' action={action}>
            <div className="grid gap-2">
                <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                />
                <FieldError formState={state} name="email" />
            </div>
            <div>
                <Input type="password" placeholder="Mot de passe" name="password" />
                <FieldError formState={state} name="password" />
            </div>
            <SubmitButton className='mt-2'>Se Connecter</SubmitButton>
        </form>
    )
}

export function SignupForm() {
    const [state, action] = useFormState(signup, EMPTY_FORM_STATE)

    return (
        <form className='flex flex-col gap-4 w-[310px]' action={action}>
            <div className='flex gap-2'>
                <div>
                    <Input type="text" placeholder="Nom" name='lastName' className="placeholder:text-xs" />
                    <FieldError formState={state} name="lastName" />
                </div>
                <div>
                    <Input type="text" placeholder="Prénom" name='firstName' className="placeholder:text-xs" />
                    <FieldError formState={state} name="firstName" />
                </div>
            </div>
            <div >
                <Input type="email" placeholder="Email" name='email' className="placeholder:text-xs" />
                <FieldError formState={state} name="email" />
            </div >
            <div>
                <Input type="text" placeholder="Adresse" name='address' className="placeholder:text-xs" />
                <FieldError formState={state} name="address" />
            </div>
            <div className='flex gap-2'>
                <div>
                    <Input type="password" placeholder="Mot de passe" name='password' className="placeholder:text-xs" />
                    <FieldError formState={state} name="password" />
                </div>
                <div >
                    <Input type="password" placeholder="Répéter mot de passe" name='repeatPassword' className="placeholder:text-xs" />
                    <FieldError formState={state} name="repeatPassword" />
                </div>
            </div>
            <SubmitButton className='mt-2'>S&apos;inscrire</SubmitButton>
        </form>
    )
}