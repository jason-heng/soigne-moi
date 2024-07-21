import { logout } from "@/_lib/session";
import { SideBarLink } from "@/_components/SideBarLink";
import { faArrowRightFromBracket, faGears, faHouse, faUser, faUserDoctor, faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/_components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";


function SideBar() {
    return (
        <>
            <nav className='h-screen hidden lg:flex py-8 bg-foreground flex-col justify-between text-white text-opacity-80'>
                <div>
                    <Link href="/"><h1 className='text-2xl font-bold text-white text-center'>SoigneMoi</h1></Link>
                    <ul className='my-6 flex flex-col'>
                        <SideBarLink text="Accueil" href="/admin" icon={faHouse} />
                        <SideBarLink text="Docteurs" href="/admin/doctors" icon={faUserDoctor} />
                        <SideBarLink text="Secrétaires" href="/admin/secretaries" icon={faUserNurse} />
                        <SideBarLink text="Utilisateurs" href="/admin/users" icon={faUser} />
                        <SideBarLink text="Parametres" href="/admin/settings" icon={faGears} />
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
                            <ul className='my-6 flex flex-col'>
                                <SideBarLink text="Accueil" href="/admin" icon={faHouse} />
                                <SideBarLink text="Docteurs" href="/admin/doctors" icon={faUserDoctor} />
                                <SideBarLink text="Secrétaires" href="/admin/secretaries" icon={faUserNurse} />
                                <SideBarLink text="Utilisateurs" href="/admin/users" icon={faUser} />
                                <SideBarLink text="Parametres" href="/admin/settings" icon={faGears} />
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

export default function AdminDashboardLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <main className="flex flex-col lg:flex-row">
            <SideBar />
            <div className="flex flex-1">
                {children}
            </div>
        </main>
    );
}
