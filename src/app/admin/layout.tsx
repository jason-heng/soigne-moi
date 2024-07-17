import { SideBarLink } from "@/components/patient/SideBarLink";
import { logout } from "@/lib/auth";
import { faArrowRightFromBracket, faGears, faHospital, faHouse, faUser, faUserDoctor, faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";


async function SideBar() {
    return (
        <nav className='h-screen py-8 bg-foreground flex flex-col justify-between text-white text-opacity-80'>
            <div>
                <h1 className='text-2xl font-bold text-white text-center'>SoigneMoi</h1>
                <ul className='my-6 flex flex-col'>
                    <SideBarLink text="Accueil" href="/admin" icon={faHouse} />
                    <SideBarLink text="Docteurs" href="/admin/doctors" icon={faUserDoctor} />
                    <SideBarLink text="Secrétaires" href="/admin/nurses" icon={faUserNurse} />
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
    )
}

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <main className="flex">
            <SideBar />
            <div className="flex flex-1">
                {children}
            </div>
        </main>
    );
}
