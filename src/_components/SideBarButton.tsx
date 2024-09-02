import { cn } from "@/_lib/utils"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"

export function SideBarButton({ href, icon, children }: PropsWithChildren<{
    href: string
    icon: IconDefinition
}>) {
    const pathname = usePathname()

    return (
        <Link href={href} className={cn('flex items-center gap-3 px-5 py-3', {
            "bg-primary": pathname === href,
            "hover:text-primary": pathname !== href,
        })}>
            <FontAwesomeIcon icon={icon} height={20} width={20} />
            {children}
        </Link>
    )
}