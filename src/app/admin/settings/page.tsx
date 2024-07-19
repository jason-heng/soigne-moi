import { getUser } from '@/_data/users'
import React from 'react'
import EditPasswordForm from './_components/EditPasswordForm'
import EditInfoForm from './_components/EditInfoForm'

export default async function AdminSettings() {
    const user = await getUser()

    return (
        <div className='flex-1 p-8 h-screen'>
            <h1 className='text-xl'>Vos paramètres</h1>
            <div className='flex flex-1 flex-col gap-6'>
                <EditInfoForm user={user} />
                <EditPasswordForm />
            </div >
        </div >
    )
}