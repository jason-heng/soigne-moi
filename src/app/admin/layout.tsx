import { PropsWithChildren } from "react";
import { SideBar, SideBarLink } from "@/_components/SideBar";
import { faGears, faHouse, faUser, faUserDoctor, faUserNurse } from "@fortawesome/free-solid-svg-icons";


export default function AdminDashboardLayout({ children }: Readonly<PropsWithChildren>) {
    const sideBarLinks: SideBarLink[] = [
        {
            href: "/admin",
            text: "Accueil",
            icon: faHouse
        },
        {
            href: "/admin/doctors",
            text: "Docteurs",
            icon: faUserDoctor
        },
        {
            href: "/admin/secretaries",
            text: "Secrétaires",
            icon: faUserNurse
        },
        {
            href: "/admin/users",
            text: "Utilisateurs",
            icon: faUser
        },
        {
            href: "/admin/settings",
            text: "Parametres",
            icon: faGears
        }
    ]

    return (
        <main className="flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">
            <SideBar links={sideBarLinks} />
            {children}
        </main>
    );
}
