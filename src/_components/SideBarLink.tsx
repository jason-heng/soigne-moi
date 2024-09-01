"use client"

import { cn } from "@/_lib/utils"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"

export default function SideBarLink({ href, icon, children }: PropsWithChildren<{
    href: string
    icon: IconDefinition
}>) {
    const pathName = usePathname()

    return (
        <Link href={href} className={cn('flex items-center gap-3 px-5 py-3', {
            "bg-primary": pathName === href,
            "hover:text-primary": pathName !== href,
        })}>
            <FontAwesomeIcon icon={icon} height={20} width={20} />
            {children}
        </Link>
    )
}