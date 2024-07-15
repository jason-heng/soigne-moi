import EditPasswordForm from '@/components/patient/settings/EditPasswordForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SessionUser, getSession } from '@/lib/auth'
import { getUser } from '@/lib/users'
import { redirect } from 'next/navigation'
import React from 'react'



export default async function page() {
    const session = await getSession()

    if (!session) redirect('/auth')

    const userSession = (session.user as SessionUser)

    const user = await getUser(userSession.id)

    if (!user) redirect('/auth')

    return (
        <div className='flex-1 p-8 h-screen'>
            <h1 className='text-xl font-bold'>Vos Parametres</h1>
            <div className='flex flex-1 flex-col gap-6'>
                <form action="" className='flex flex-col gap-2 mt-5'>
                    <h2 className='text-xl'>Informations Personnelles</h2>
                    <div className='flex gap-5 max-w-[600px]'>
                        <div className='w-full'>
                            <Label>Votre Nom:</Label>
                            <Input placeholder='Entrez un nom...' value={user.lastName} />
                        </div>
                        <div className='w-full'>
                            <Label>Votre Prénom:</Label>
                            <Input placeholder='Entrez un prénom' value={user.firstName} />
                        </div>
                    </div>
                    <div className='flex gap-5 max-w-[600px]'>
                        <div className='w-full'>
                            <Label>Votre Email:</Label>
                            <Input placeholder='Email' className='max-w-[600px]' value={user.email} />
                        </div>
                        <div className='w-full'>
                            <Label>Votre Adresse:</Label>
                            <Input placeholder='Adresse' className='max-w-[600px]' value={user.address} />
                        </div>
                    </div>

                    <Button className='max-w-[200px] mt-4'>Sauvegarder</Button>
                </form>

                <EditPasswordForm userId={user.id} />
            </div >
        </div >
    )
}

function add(a: number, b: number) { return a + b }

(() => {
    const res = add(1, 3)

    console.log(res === 4);
})()
