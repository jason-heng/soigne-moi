import { SideBarLink } from "@/_components/SideBarLink";
import { faArrowRightFromBracket, faGears, faHospital, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";
import { deleteSession } from "@/_lib/session";

async function SideBar() {
    return (
        <nav className='h-screen py-8 bg-foreground flex flex-col justify-between text-white text-opacity-80'>
            <div>
                <h1 className='text-2xl font-bold text-white text-center'>SoigneMoi</h1>
                <ul className='my-6 flex flex-col'>
                    <SideBarLink text="Accueil" href="/patient" icon={faHouse} />
                    <SideBarLink text="Historique" href="/patient/history" icon={faHospital} />
                    <SideBarLink text="Parametres" href="/patient/settings" icon={faGears} />
                </ul>
            </div>
            <form action={deleteSession}>
                <button className='flex items-center gap-3 px-5 hover:text-primary'>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} height={20} width={20} />
                    Déconnexion
                </button>
            </form>
        </nav>
    )
}

export default function PatientDashboardLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <main className="flex">
            <SideBar />
            <div className="flex flex-1">
                {children}
            </div>
        </main>
    );
}
