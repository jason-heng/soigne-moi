import { SideBar, SideBarLink } from "@/_components/SideBar";
import { faGears, faHospital, faHouse } from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren } from "react";

export default function PatientDashboardLayout({ children }: Readonly<PropsWithChildren>) {
    const sideBarLinks: SideBarLink[] = [
        {
            href: "/patient",
            text: "Acceuil",
            icon: faHouse
        },
        {
            href: "/patient/history",
            text: "Historique",
            icon: faHospital
        },
        {
            href: "/patient/settings",
            text: "Parametres",
            icon: faGears
        },
    ]

    return (
        <main className="flex flex-col lg:flex-row overflow-clip h-screen w-screen">
            <SideBar links={sideBarLinks} />
            {children}
        </main>
    );
}
