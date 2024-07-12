import Medecine from "@/components/svgs/Medecine";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

function NavBar() {
  return (
    <nav className="sticky px-12 py-6 flex justify-between w-full items-center">
      <h1 className="font-bold text-xl text-primary">SoigneMoi</h1>
      <ul >
        <Link href="#" className="text-slate-800 opacity-80 hover:text-primary transition-all p-3">Accueil</Link>
        <Link href="#" className="text-slate-800 opacity-80 hover:text-primary transition-all p-3">A Propos</Link>
        <Link href="#" className="text-slate-800 opacity-80 hover:text-primary transition-all p-3">Préstations</Link>
        <Link href="#" className="text-slate-800 opacity-80 hover:text-primary transition-all p-3">Nos Docteurs</Link>
      </ul>
      <div>
        <Link href="/signup" className="text-slate-800 opacity-80 hover:text-primary transition-all p-3">S&apos;inscrire</Link>
        <Link href="/login" className={buttonVariants({ variant: "default" })}>Se Connecter</Link>
      </div>
    </nav>
  )
}

function Section({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={cn('max-w-5xl m-auto my-[50px]', className)}>
      {children}
    </section>
  )
}

function Hero() {
  return (
    <Section className="flex relative gap-2 items-center">
      <div className="flex flex-col gap-7 w-fit">
        <h1 className="font-bold text-2xl">Votre bien-etre<br />est entre nos mains</h1>
        <p>
          Nous mettons à votre disposition une équipe de professionnels de la santé dévoués et compétents, prêts à vous offrir des soins personnalisés de la plus haute qualité.
          Chez SoigneMoi, nous croyons que chaque patient mérite une attention exceptionnelle et des traitements avancés pour un rétablissement rapide et durable.
          Votre santé, notre priorité.
        </p>
        <Link href="/login" className={cn(buttonVariants({ variant: "default" }), "w-fit")}>Se Connecter</Link>
      </div>
      <div className="shadow-lg absolute bottom-0 left-[43%] bg-secondary p-2 rounded-sm flex flex-col items-center">
        <h3 className="font-bold text-primary">312+</h3>
        <h3>Patients Satisfaits</h3>
      </div>
      <Medecine className="text-primary" />
    </Section>
  )
}

function About() {
  return (
    <Section className="flex gap-5 items-center">
      <Image src="/soigne-moi.jpg" alt="Image de l'établissement" height={325} width={487} className="rounded-md" />
      <div className="flex flex-col gap-7 w-fit">
        <h2 className="text-3xl font-bold">A Propos de Nous</h2>
        <p className="text-sm">
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

function Services() {
  return (
    <Section className="flex flex-col gap-5 items-center">
      <h2 className="text-3xl font-bold">Ce Qu’on Vous Offre</h2>
      <div className="flex bg-blue-200 w-full justify-between">
        <div className="shadow-lg bg-secondary h-20 w-20">
          
        </div>
      </div>
    </Section>
  )
}

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <About />
      <Services />
    </main>
  );
}
