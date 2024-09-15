import NavBarButton from "@/components/nav-bar-button"
import Docteur from "@/components/svgs/Docteur"
import Medecine from "@/components/svgs/Medecine"
import MobileMessaging from "@/components/svgs/MobileMessaging"
import TwoDoctors from "@/components/svgs/TwoDoctors"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserSession } from "@/lib/session"
import { cn } from "@/lib/utils"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { ComponentPropsWithoutRef, ReactNode } from "react"

export function NavBarLinks({ className }: { className?: string }) {
    return (
        <ul className={cn("flex flex-col lg:flex-row justify-between", className)}>
            <NavBarButton href="#home">Accueil</NavBarButton>
            <NavBarButton href="#about">A Propos</NavBarButton>
            <NavBarButton href="#services">Préstations</NavBarButton>
            <NavBarButton href="#doctors">Nos Docteurs</NavBarButton>
        </ul>
    )
}

export function NavBarButtons({ session, className }: { session: UserSession | null, className?: string }) {
    return (
        <div className={cn("flex flex-col items-center lg:flex-row", className)}>
            {session ?
                session.user.admin ?
                    <Link href="/admin" className={buttonVariants({ variant: "default", className: "w-full" })}>Espace Admin</Link> :
                    <Link href="/patient" className={buttonVariants({ variant: "default", className: "w-full" })}>Espace Patient</Link>
                :
                <>
                    <Link href="/auth?tab=signup" className="text-slate-800 opacity-80 hover:text-primary transition-all p-3">S&apos;inscrire</Link>
                    <Link href="/auth" className={buttonVariants({ variant: "default", className: "w-full" })}>Se connecter</Link>
                </>}
        </div>
    )
}

export function NavBar({ session }: { session: UserSession | null }) {
    return (
        <nav className="sticky px-5 lg:px-12 py-4 flex justify-between w-full items-center top-0 bg-white z-30">
            <Link className="font-bold text-xl text-primary" href="/"><h1>SoigneMoi</h1></Link>
            <NavBarLinks className="hidden lg:flex" />
            <NavBarButtons session={session} className="hidden lg:flex" />
            <Sheet>
                <SheetTrigger className="lg:hidden">
                    <HamburgerMenuIcon color="rgb(37, 99, 235)" height={20} width={20} />
                </SheetTrigger>
                <SheetContent closeIconColor="black" className="flex flex-col bg-white border-none pb-5 pt-10 w-[200px] text-white justify-between" color="red">
                    <NavBarLinks />
                    <NavBarButtons session={session} />
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export function Section({ children, className, ...props }: ComponentPropsWithoutRef<"section">) {
    return (
        <section className={cn('max-w-xs lg:max-w-5xl m-auto my-24 scroll-mt-24', className)} {...props}>
            {children}
        </section>
    )
}

export function Hero({ session }: { session: UserSession | null }) {
    return (
        <Section className="flex flex-col-reverse lg:flex-row relative gap-10 lg:gap5 items-center" id="home">
            <div className="flex flex-col gap-5 w-fit flex-1">
                <h2 className="font-bold text-2xl">Votre bien-etre<br />est entre nos mains</h2>
                <p className="text-muted-foreground">
                    Nous mettons à votre disposition une équipe de professionnels de la santé dévoués et compétents, prêts à vous offrir des soins personnalisés de la plus haute qualité.
                    Chez SoigneMoi, nous croyons que chaque patient mérite une attention exceptionnelle et des traitements avancés pour un rétablissement rapide et durable.
                    Votre santé, notre priorité.
                </p>
                {session ? session.user.admin ?
                    <Link href="/admin" className={cn(buttonVariants({ variant: "default" }), "w-fit")}>Acceder a l&apos;espace admin</Link>
                    :
                    <Link href="/patient" className={cn(buttonVariants({ variant: "default" }), "w-fit")}>Acceder a l&apos;espace patient</Link>
                    :
                    <Link href="/auth" className={cn(buttonVariants({ variant: "default" }), "w-fit")}>Connectez vous</Link>
                }
            </div>
            <div className="flex relative flex-col w50 flex-1">
                <Medecine className="text-primary " />
                <div className="shadow-lg absolute bottom-[-10%] left-[38%] lg:left-[40%] bg-secondary p-2 rounded-sm flex flex-col items-center">
                    <h3 className="font-bold text-primary text-xs lg:text-lg">+312</h3>
                    <h3 className="text-xs lg:text-lg">Patients satisfaits</h3>
                </div>
            </div>
        </Section>
    )
}

export function About() {
    return (
        <Section className="flex flex-col lg:flex-row gap-5 items-center" id="about">
            <Image src="/SoigneMoi.jpg" alt="Image de l'établissement" height={325} width={487} className="rounded-md" />
            <div className="flex flex-col gap-7 w-fit">
                <h2 className="text-3xl font-bold">A propos de nous</h2>
                <p className="text-sm text-muted-foreground">
                    L&apos;Hôpital SoigneMoi est un établissement public de santé situé au cœur de l&apos;Île. Reconnu pour ses services de proximité et de spécialité, cet hôpital est également un centre d&apos;enseignement et de recherche médicale de premier plan.
                    <br />
                    <br />
                    Grâce à ses 46 bâtiments répartis sur 12 hectares, SoigneMoi offre une large gamme de services médicaux au sein de ses 52 services regroupés en 8 pôles spécialisés. Chaque pôle est dédié à des domaines médicaux précis, garantissant une prise en charge optimale et complète des patients.
                    <br />
                    <br />
                    Les services de l&apos;Hôpital SoigneMoi sont largement reconnus au niveau national pour leur excellence et leur innovation.
                </p>
            </div>
        </Section>
    )
}

export function Card({ img, title, description }: { img: ReactNode, title: string, description: string }) {
    return (
        <div className="w-[250px] rounded-lg shadow-2xl flex flex-col p-6 border-[1px] h-[350px] border-gray-100">
            {img}
            <h3 className={`font-bold text-xl my-2`}>
                {title}
            </h3>
            <p className="text-[13px] text-muted-foreground">
                {description}
            </p>
        </div>
    )
}

export function Services() {
    return (
        <Section className="flex flex-col items-center gap-12" id="services">
            <h2 className="text-[1.67rem] lg:text-3xl font-bold">{"Ce qu'on vous offre"}</h2>
            <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-8">
                <Card title="Meilleurs Soins" description="Nous offrons des soins de haute qualité avec des technologies médicales avancées et des protocoles à jour, en prenant en compte le bien-être physique, émotionnel et mental de nos patients." img={<Docteur className="text-primary mx-auto" height={100} width={110} />} />
                <Card title="Excellent Personnel" description="Notre personnel est notre plus grande force. Composé de docteurs, infirmières, techniciens et personnel de soutien hautement qualifiés et expérimentés, notre équipe est dédiée à fournir des soins exceptionnels." img={<TwoDoctors className="text-primary mx-auto" height={100} width={100} />} />
                <Card title="Experience Digitale" description="Nous offrons une expérience digitale pour simplifier le parcours de soins de nos patients. Notre portail patient permet de prendre rendez-vous, accéder aux dossiers médicaux et consulter les résultats pour une gestion de santé efficace." img={<MobileMessaging className="text-primary mx-auto" height={100} width={100} />} />
            </div>
        </Section>
    )
}

export function Doctors() {
    return (
        <Section className="flex flex-col gap-12 items-center" id="doctors">
            <h2 className="text-[1.67rem] lg:text-3xl font-bold">Nos docteurs renommés</h2>
            <div className="flex w-full flex-col lg:flex-row justify-between items-center gap-8">
                <Card title="Dr. Thomas Lefevre" description="Chirurgien" img={<Image className="rounded-lg mb-2 mx-auto" src="/ThomasLefevre.jpg" alt="Dr. Thomas Lefevre" width={190} height={237} />} />
                <Card title="Dr. Amélie Martin" description="Neurologue" img={<Image className="rounded-lg mb-2 mx-auto" src="/AmelieMartin.jpg" alt="Dr. Amélie Martin" width={190} height={237} />} />
                <Card title="Dr. Philippe Bernard" description="Cardiologue" img={<Image className="rounded-lg mb-2 mx-auto" src="/PhilippeBernard.jpg" alt="Dr. Philippe Bernard" width={190} height={237} />} />
            </div>
        </Section>
    )
}

export function Footer() {
    return (
        <footer className="w-full flex bg-primary px-5 lg:px-24 opacity-90 py-5 flex-col gap-6">
            <Link href="/" className="text-white font-semibold text-2xl"><h1>SoigneMoi</h1></Link>
            <div className="flex flex-col lg:flex-row gap-5 justify-between">
                <div>
                    <p className="text-white font-bold mb-2">Adresse:</p>
                    <p className="text-white opacity-75">
                        123 Rue de la Santé, 59000 Lille, France
                    </p>
                </div>

                <div className="text-nowrap">
                    <p className="text-white font-bold mb-2">Téléphone:</p>
                    <p className="text-white opacity-75">06 42 68 75 39</p>
                    <p className="text-white opacity-75">07 97 45 63 21</p>
                    <p className="text-white opacity-75">01 80 32 48 57</p>
                </div>

                <div className="text-nowrap">
                    <p className="text-white font-bold mb-2">Email:</p>
                    <p className="text-white opacity-75">contact@soignemoi-lille.fr</p>
                    <p className="text-white opacity-75">info@hopital-sante-lille.fr</p>
                </div>
            </div>
        </footer>
    )
}