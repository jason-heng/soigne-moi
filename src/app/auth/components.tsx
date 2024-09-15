"use client"

import { login, signup } from "@/actions/auth"
import { FieldError } from "@/components/field-error"
import SubmitButton from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToastMessage } from "@/hooks/use-toast-message"
import { EMPTY_FORM_STATE } from "@/lib/to-form-state"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"

export function TabsLayout({ tab }: { tab: "signup" | "login" }) {
    const router = useRouter()

    return (
        <Tabs value={tab} onValueChange={tab => router.push(`/auth?tab=${tab}`)} className='flex flex-col justify-center items-center gap-3'>
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

    useToastMessage(state)

    return (
        <form className='flex flex-col gap-2 ' action={action}>
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
            <div className="grid gap-2">
                <Label htmlFor="password" className="text-muted-foreground">Mot de passe</Label>
                <PasswordInput placeholder="votre mot de passe" name="password" />
                <FieldError formState={state} name="password" />
            </div>
            <SubmitButton className='mt-2'>Se connecter</SubmitButton>
        </form>
    )
}

export function SignupForm() {
    const [state, action] = useFormState(signup, EMPTY_FORM_STATE)

    useToastMessage(state)

    return (
        <form className='flex flex-col gap-3 w-[365px]' action={action}>
            <div className='flex gap-2'>
                <div>
                    <Input type="text" placeholder="Nom" name='last-name' className="placeholder:text-xs" />
                    <FieldError formState={state} name="lastName" />
                </div>
                <div>
                    <Input type="text" placeholder="Prénom" name='first-name' className="placeholder:text-xs" />
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
                    <PasswordInput placeholder="Mot de passe" name='password' className="placeholder:text-xs" />
                    <FieldError formState={state} name="password" />
                </div>
                <div >
                    <PasswordInput placeholder="Répéter mot de passe" name='repeat-password' className="placeholder:text-xs" />
                    <FieldError formState={state} name="repeatPassword" />
                </div>
            </div>
            <SubmitButton className='mt-2'>S&apos;inscrire</SubmitButton>
        </form>
    )
}