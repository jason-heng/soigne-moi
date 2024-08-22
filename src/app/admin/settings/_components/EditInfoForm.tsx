"use client"

import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { getUser } from '@/_data/users'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { editInfo } from '../actions'
import { useFormState } from 'react-dom'
import SubmitButton from '@/_components/SubmitButton'

export default function EditInfoForm({ user }: { user: Awaited<ReturnType<typeof getUser>> }) {
    const [state, action] = useFormState(editInfo, null)

    useEffect(() => {
        if (state?.success) {
            toast.success('Informations modifiée !')
        }
    }, [state])

    return (
        <form action={action} className='flex flex-col gap-2 mt-5'>
            <h2 className='text-lg'>Informations personnelles</h2>
            <div className='flex gap-5 max-w-[600px]'>
                <div className='w-full'>
                    <Label>Votre Nom:</Label>
                    <Input placeholder='Entrez un nom...' name="last-name" defaultValue={user?.lastName} />
                    {state?.errors?.lastName && <p className='text-sm text-destructive'>{state?.errors.lastName}</p>}
                </div>
                <div className='w-full'>
                    <Label>Votre Prénom:</Label>
                    <Input placeholder='Entrez un prénom' name="first-name" defaultValue={user?.firstName} />
                    {state?.errors?.firstName && <p className='text-sm text-destructive'>{state?.errors.firstName}</p>}
                </div>
            </div>
            <div className='flex gap-5 max-w-[600px]'>
                <div className='w-full'>
                    <Label>Votre Email:</Label>
                    <Input placeholder='Email' className='max-w-[600px]' name="email" defaultValue={user?.email} />
                    {state?.errors?.email && <p className='text-sm text-destructive'>{state?.errors.email}</p>}
                </div>
                <div className='w-full'>
                    <Label>Votre Adresse:</Label>
                    <Input placeholder='Adresse' className='max-w-[600px]' name="address" defaultValue={user?.address} />
                    {state?.errors?.address && <p className='text-sm text-destructive'>{state?.errors.address}</p>}
                </div>
            </div>

            <SubmitButton text='Sauvegarder' className='max-w-[200px] mt-4' />
        </form>
    )
}
