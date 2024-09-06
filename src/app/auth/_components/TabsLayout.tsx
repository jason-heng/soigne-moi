"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_components/ui/tabs"
import { useRouter } from "next/navigation"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

export default function TabsLayout({ tab }: { tab: "signup" | "login" }) {
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
