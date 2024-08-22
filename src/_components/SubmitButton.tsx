"use client"

import { Loader2 } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

export default function SubmitButton({ text, className, disabled }: { text: string } & ComponentPropsWithoutRef<"button">) {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending || disabled} className={className}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? "Chargement..." : text}
        </Button>
    )
}
