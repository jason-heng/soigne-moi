"use client"

import SubmitButton from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToastMessage } from '@/hooks/use-toast-message'
import { EMPTY_FORM_STATE } from '@/lib/to-form-state'
import { useFormState } from 'react-dom'
import { FieldError } from '../field-error'
import { editInfo } from './actions'

export default function EditInfoForm({ firstName, lastName, email, address }: {
    firstName: string
    lastName: string
    email: string
    address: string
}) {
    const [state, action] = useFormState(editInfo, EMPTY_FORM_STATE)

    useToastMessage(state)

    return (
        <form action={action} className='flex flex-col gap-2 mt-5'>
            <h2 className='text-lg'>Informations personnelles</h2>
            <div className='flex gap-5 max-w-[600px]'>
                <div className='w-full'>
                    <Label>Votre nom:</Label>
                    <Input placeholder='Entrez un nom...' name="last-name" defaultValue={lastName} />
                    <FieldError formState={state} name="lastName" />
                </div>
                <div className='w-full'>
                    <Label>Votre prénom:</Label>
                    <Input placeholder='Entrez un prénom...' name="first-name" defaultValue={firstName} />
                    <FieldError formState={state} name="firstName" />
                </div>
            </div>
            <div className='flex gap-5 max-w-[600px]'>
                <div className='w-full'>
                    <Label>Votre email:</Label>
                    <Input placeholder='Entrez un email...' className='max-w-[600px]' name="email" defaultValue={email} />
                    <FieldError formState={state} name="email" />
                </div>
                <div className='w-full'>
                    <Label>Votre adresse:</Label>
                    <Input placeholder='Entrez une adresse...' className='max-w-[600px]' name="address" defaultValue={address} />
                    <FieldError formState={state} name="address" />
                </div>
            </div>

            <SubmitButton className='max-w-[200px] mt-4'>Sauvegarder</SubmitButton>
        </form>
    )
}
