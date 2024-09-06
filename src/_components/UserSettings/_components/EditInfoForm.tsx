"use client"

import SubmitButton from '@/_components/SubmitButton'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { editInfo } from '../actions'

export default function EditInfoForm({ firstName, lastName, email, address }: {
    firstName: string
    lastName: string
    email: string
    address: string
}) {
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
                    <Label>Votre nom:</Label>
                    <Input placeholder='Entrez un nom...' name="last-name" defaultValue={lastName} />
                    {state?.errors?.lastName && <p className='text-sm text-destructive'>{state?.errors.lastName}</p>}
                </div>
                <div className='w-full'>
                    <Label>Votre prénom:</Label>
                    <Input placeholder='Entrez un prénom...' name="first-name" defaultValue={firstName} />
                    {state?.errors?.firstName && <p className='text-sm text-destructive'>{state?.errors.firstName}</p>}
                </div>
            </div>
            <div className='flex gap-5 max-w-[600px]'>
                <div className='w-full'>
                    <Label>Votre email:</Label>
                    <Input placeholder='Entrez un email...' className='max-w-[600px]' name="email" defaultValue={email} />
                    {state?.errors?.email && <p className='text-sm text-destructive'>{state?.errors.email}</p>}
                </div>
                <div className='w-full'>
                    <Label>Votre adresse:</Label>
                    <Input placeholder='Entrez une adresse...' className='max-w-[600px]' name="address" defaultValue={address} />
                    {state?.errors?.address && <p className='text-sm text-destructive'>{state?.errors.address}</p>}
                </div>
            </div>

            <SubmitButton className='max-w-[200px] mt-4'>Sauvegarder</SubmitButton>
        </form>
    )
}
