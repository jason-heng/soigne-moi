import Medecine from "@/_components/svgs/Medecine";
import { buttonVariants } from "@/_components/ui/button";
import { cn } from "@/_lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import Docteur from "../_components/svgs/Docteur";
import MobileMessaging from "@/_components/svgs/MobileMessaging";
import TwoDoctors from "@/_components/svgs/TwoDoctors";
import NavBarLink from "@/_components/NavBarLink";
import { getSession, UserSession } from "@/_lib/session";

export function NavBar({ session }: { session: UserSession | null }) {
  return (
    <nav className="sticky px-12 py-4 flex justify-between w-full items-center top-0 bg-white z-30">
      <Link className="font-bold text-xl text-primary" href="/">SoigneMoi</Link>
      <ul>
        <NavBarLink href="#home">Accueil</NavBarLink>
        <NavBarLink href="#about">A Propos</NavBarLink>
        <NavBarLink href="#services">Préstations</NavBarLink>
        <NavBarLink href="#doctors">Nos Docteurs</NavBarLink>
      </ul>
      <div>
        {session ?
          session.user.admin ?
            <Link href="/admin" className={buttonVariants({ variant: "default" })}>Espace Admin</Link> :
            <Link href="/patient" className={buttonVariants({ variant: "default" })}>Espace Patient</Link>
          :
          <>
            <Link href="/auth?tab=signup" className="text-slate-800 opacity-80 hover:text-primary transition-all p-3">S&apos;inscrire</Link>
            <Link href="/auth" className={buttonVariants({ variant: "default" })}>Se Connecter</Link>
          </>}
      </div>
    </nav>
  )
}

export function Section({ children, className, ...props }: ComponentPropsWithoutRef<"section">) {
  return (
    <section className={cn('max-w-5xl m-auto my-[50px] scroll-mt-24', className)} {...props}>
      {children}
    </section>
  )
}

export function Hero({ session }: { session: UserSession | null }) {
  return (
    <Section className="flex relative gap-5 items-center" id="home">
      <div className="flex flex-col gap-5 w-fit">
        <h2 className="font-bold text-2xl">Votre bien-etre<br />est entre nos mains</h2>
        <p className="text-muted-foreground">
          Nous mettons à votre disposition une équipe de professionnels de la santé dévoués et compétents, prêts à vous offrir des soins personnalisés de la plus haute qualité.
          Chez SoigneMoi, nous croyons que chaque patient mérite une attention exceptionnelle et des traitements avancés pour un rétablissement rapide et durable.
          Votre santé, notre priorité.
        </p>
        {session ? session.user.admin ?
          <Link href="/admin" className={cn(buttonVariants({ variant: "default" }), "w-fit")}>Acceder a l'espace admin</Link>
          :
          <Link href="/patient" className={cn(buttonVariants({ variant: "default" }), "w-fit")}>Acceder a l'espace patient</Link>
          :
          <Link href="/auth" className={cn(buttonVariants({ variant: "default" }), "w-fit")}>Connectez vous</Link>
        }
      </div>
      <div className="shadow-lg absolute bottom-0 left-[43%] bg-secondary p-2 rounded-sm flex flex-col items-center">
        <h3 className="font-bold text-primary">+312</h3>
        <h3>Patients satisfaits</h3>
      </div>
      <Medecine className="text-primary" />
    </Section>
  )
}

export function About() {
  return (
    <Section className="flex gap-5 items-center" id="about">
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
    <div className="w-[250px] rounded-lg shadow-2xl flex flex-col p-6 border-[1px] border-gray-100">
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
    <Section className="flex flex-col gap-12 items-center mb-[100px]" id="services">
      <h2 className="text-3xl font-bold">Ce qu’on vous offre</h2>
      <div className="flex w-full justify-between h-[350px]">
        <Card title="Meilleurs Soins" description="Nous offrons des soins de haute qualité avec des technologies médicales avancées et des protocoles à jour, en prenant en compte le bien-être physique, émotionnel et mental de nos patients." img={<Docteur className="text-primary mx-auto" height={100} width={110} />} />
        <Card title="Excellent Personnel" description="Notre personnel est notre plus grande force. Composé de médecins, infirmières, techniciens et personnel de soutien hautement qualifiés et expérimentés, notre équipe est dédiée à fournir des soins exceptionnels." img={<TwoDoctors className="text-primary mx-auto" height={100} width={100} />} />
        <Card title="Experience Digitale" description="Nous offrons une expérience digitale pour simplifier le parcours de soins de nos patients. Notre portail patient permet de prendre rendez-vous, accéder aux dossiers médicaux et consulter les résultats pour une gestion de santé efficace." img={<MobileMessaging className="text-primary mx-auto" height={100} width={100} />} />
      </div>
    </Section>
  )
}

export function Doctors() {
  return (
    <Section className="flex flex-col gap-12 items-center" id="doctors">
      <h2 className="text-3xl font-bold">Nos docteurs renommés</h2>
      <div className="flex w-full justify-between h-[350px]">
        <Card title="Dr. Thomas Lefevre" description="Chirurgien" img={<Image className="rounded-lg mb-2 mx-auto" src="/ThomasLefevre.jpg" alt="Dr. Thomas Lefevre" width={190} height={237} />} />
        <Card title="Dr. Amélie Martin" description="Neurologue" img={<Image className="rounded-lg mb-2 mx-auto" src="/AmelieMartin.jpg" alt="Dr. Amélie Martin" width={190} height={237} />} />
        <Card title="Dr. Philippe Bernard" description="Cardiologue" img={<Image className="rounded-lg mb-2 mx-auto" src="/PhilippeBernard.jpg" alt="Dr. Philippe Bernard" width={190} height={237} />} />
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="w-full bg-primary px-24 opacity-90 py-5">
      <h1 className="text-white font-semibold text-2xl">
        SoigneMoi
      </h1>
      <div className="flex gap-[300px] mt-6 w-fit">
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

export default async function Home() {
  const session = await getSession()

  return (
    <main>
      <NavBar session={session} />
      <Hero session={session} />
      <About />
      <Services />
      <Doctors />
      <Footer />
    </main>
  );
}
