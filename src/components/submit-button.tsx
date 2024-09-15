"use client"

import { Loader2 } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

export default function SubmitButton({ disabled, children, ...props }: ComponentPropsWithoutRef<"button">) {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending || disabled} {...props}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? "Chargement..." : children}
        </Button>
    )
}
