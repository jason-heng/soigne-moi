import SideBarLink from "@/_components/SideBarLink";
import { faArrowRightFromBracket, faGears, faHospital, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";
import { logout } from "@/_lib/session";
import { Sheet, SheetContent, SheetTrigger } from "@/_components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

async function SideBar() {
    return (
        <>
            <nav className='h-screen hidden lg:flex py-8 bg-foreground flex-col justify-between text-white text-opacity-80'>
                <div>
                    <Link href="/"><h1 className='text-2xl font-bold text-white text-center'>SoigneMoi</h1></Link>
                    <ul className='my-6 flex flex-col'>
                        <SideBarLink href="/patient" icon={faHouse}>Accueil</SideBarLink>
                        <SideBarLink href="/patient/history" icon={faHospital}>Historique</SideBarLink>
                        <SideBarLink href="/patient/settings" icon={faGears}>Parametres</SideBarLink>
                    </ul>
                </div>
                <form action={logout}>
                    <button className='flex items-center gap-3 px-5 hover:text-primary'>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} height={20} width={20} />
                        Déconnexion
                    </button>
                </form>
            </nav>
            <Sheet>
                <nav className="bg-foreground flex lg:hidden justify-between items-center px-3">
                    <Link href="/"><h1 className='text-xl font-bold text-white text-center'>SoigneMoi</h1></Link>
                    <SheetTrigger className="p-3"><HamburgerMenuIcon color="white" height={20} width={20} /></SheetTrigger>
                </nav>
                <SheetContent className="bg-foreground text-white p-0 pt-5 w-[200px]">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <h1 className='text-2xl font-bold text-white text-center'>SoigneMoi</h1>
                            <ul className='my-6 flex flex-col'>
                                <SideBarLink href="/patient" icon={faHouse}>Accueil</SideBarLink>
                                <SideBarLink href="/patient/history" icon={faHospital}>Historique</SideBarLink>
                                <SideBarLink href="/patient/settings" icon={faGears}>Parametres</SideBarLink>
                            </ul>
                        </div>
                        <form action={logout}>
                            <button className='flex items-center gap-3 px-5 hover:text-primary'>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} height={20} width={20} />
                                Déconnexion
                            </button>
                        </form>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default function PatientDashboardLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <main className="flex flex-col lg:flex-row overflow-clip h-screen w-screen">
            <SideBar />
            {children}
        </main>
    );
}
