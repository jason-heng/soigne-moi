"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { logout } from "@/_lib/actions"
import { faArrowRightFromBracket, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/_lib/utils"
import { PropsWithChildren } from "react"
import { usePathname } from "next/navigation"
import { SideBarButton } from "./SideBarButton"

export interface SideBarLink {
    text: string
    href: string
    icon: IconDefinition
}



export function SideBarLinks({ links, className }: { links: SideBarLink[], className?: string }) {
    return (
        <div className={cn("flex flex-col h-full justify-between", className)}>
            <div>
                <ul className='my-6 flex flex-col'>
                    {links.map(({ text, icon, href }) =>
                        <SideBarButton key={text} href={href} icon={icon}>{text}</SideBarButton>
                    )}
                </ul>
            </div>
            <form action={logout}>
                <button className='flex items-center gap-3 px-5 hover:text-primary'>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} height={20} width={20} />
                    Déconnexion
                </button>
            </form>
        </div>
    )
}

export function SideBar({ links }: { links: SideBarLink[] }) {
    return (
        <nav className='lg:h-screen flex py-5 px-5 lg:px-0 sticky top-0 left-0 z-50 bg-foreground lg:flex-col justify-between text-white'>
            <Link href="/"><h1 className='text-xl font-bold  text-center'>SoigneMoi</h1></Link>
            <SideBarLinks links={links} className="hidden lg:flex" />
            <Sheet>
                <SheetTrigger className="lg:hidden">
                    <HamburgerMenuIcon color="white" height={20} width={20} />
                </SheetTrigger>
                <SheetContent className="bg-foreground border-none px-0 py-5 w-[200px] text-white">
                    <SideBarLinks links={links} />
                </SheetContent>
            </Sheet>
        </nav >
    )
}