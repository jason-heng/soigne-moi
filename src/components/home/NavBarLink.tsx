"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'

export default function NavBarLink({ href, children }: PropsWithChildren<{ href: string }>) {
    const params = useParams();
    const [currentSection, setCurrentSection] = useState("#home")

    useEffect(() => {
        setCurrentSection(window.location.hash || "#home")
    }, [params]);

    return <Link href={href} className={cn("text-slate-800 opacity-80 hover:text-primary transition-all p-3", {
        "text-primary border-b-2 border-primary": currentSection === href
    })}>{children}</Link>
}

