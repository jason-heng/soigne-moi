"use client"

import { VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Button, buttonVariants } from './ui/button'

export interface SubmitButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

export default function SubmitButton({ disabled, children, ...props }: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending || disabled} {...props}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? "Chargement..." : children}
        </Button>
    )
}
