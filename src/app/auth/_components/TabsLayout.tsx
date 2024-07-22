"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_components/ui/tabs"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

export default function TabsLayout() {
    const searchParams = useSearchParams()
    const [tab, setTab] = useState(searchParams.get('tab') === "signup" ? "signup" : "login")

    return (
        <Tabs value={tab} onValueChange={setTab} className='flex flex-col justify-center items-center gap-5 m-5 w-[350px]'>
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
