import Medecine from "@/components/svgs/Medecine";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, ReactComponentElement, ReactElement, ReactNode } from "react";
import Docteur from "../components/svgs/Docteur";
import MobileMessaging from "@/components/svgs/MobileMessaging";
import TwoDoctors from "@/components/svgs/TwoDoctors";

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
      <Image src="/SoigneMoi.jpg" alt="Image de l'établissement" height={325} width={487} className="rounded-md" />
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

function Card(props: { title: string, text: string, img: ReactNode, mt:number}) {
  return (
    <div className=" w-[250px] rounded-lg shadow-2xl flex-col flex p-4 relative px-6 border-[1px] border-gray-100">
      {props.img}
      <h3 className={`font-bold text-xl mt-[${props.mt}px] mb-1`}>
        {props.title}
      </h3>

      <p className="text-[13px] opacity-80">
        {props.text}
      </p>
      
    </div>
  )
}

function Services() {
  return (
    <Section className="flex flex-col gap-12 items-center mb-[100px]">
      <h2 className="text-3xl font-bold">Ce Qu’on Vous Offre</h2>
      <div className="flex w-full justify-between h-[350px]">
        <Card title="Meilleurs Soins" text="Nous offrons des soins de haute qualité avec des technologies médicales avancées et des protocoles à jour, en prenant en compte le bien-être physique, émotionnel et mental de nos patients." img={<Docteur className="text-primary absolute left-[50%] translate-x-[-50%] translate-y-3" height={110} width={125}/>} mt={124} />
        <Card title="Excellent Personnel" text="Notre personnel est notre plus grande force. Composé de médecins, infirmières, techniciens et personnel de soutien hautement qualifiés et expérimentés, notre équipe est dédiée à fournir des soins exceptionnels." img={<TwoDoctors className="text-primary absolute left-[50%] translate-x-[-50%]" height={138} width={100} />} mt={124} />
        <Card title="Experience Digitale" text="Nous offrons une expérience digitale pour simplifier le parcours de soins de nos patients. Notre portail patient permet de prendre rendez-vous, accéder aux dossiers médicaux et consulter les résultats pour une gestion de santé efficace." img={<MobileMessaging className="text-primary absolute left-[50%] translate-x-[-50%]" height={138} width={100}/>} mt={124} />
      </div>
    </Section>
  )
}

function Doctors() {
  return (
    <Section className="flex flex-col gap-12 items-center">
      <h2 className="text-3xl font-bold">Nos Docteurs Renommés</h2>
      <div className="flex w-full justify-between h-[350px]">
        <Card title="Dr. Thomas Lefevre" text="Chirurgien" img={<Image className="rounded-lg mb-2 mx-auto" src="/ThomasLefevre.png" alt="Dr. Thomas Lefevre" width={190} height={237}/>} mt={20}/>
        <Card title="Dr. Amélie Martin" text="Neurologue" img={<Image className="rounded-lg mb-2 mx-auto" src="/AmelieMartin.png" alt="Dr. Amélie Martin" width={190} height={237}/>} mt={20}/>
        <Card title="Dr. Philippe Bernard" text="Cardiologue" img={<Image className="rounded-lg mb-2 mx-auto" src="/PhilippeBernard.png" alt="Dr. Philippe Bernard" width={190} height={237}/>} mt={20}/>
      </div>

    </Section>
  )
}

function Footer() {
  return (
    <footer className="h-[221px] w-full bg-primary px-24 opacity-90 pt-5">
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
        
        <div>
          <p className="text-white font-bold mb-2">Télephone:</p>
          <p className="text-white opacity-75">06 42 68 75 39</p>
          <p className="text-white opacity-75">07 97 45 63 21</p>
          <p className="text-white opacity-75">01 80 32 48 57</p>
        </div>

        <div>
          <p className="text-white font-bold mb-2">Email:</p>
          <p className="text-white opacity-75">contact@soignemoi-lille.fr</p>
          <p className="text-white opacity-75">info@hopital-sante-lille.fr</p>
        </div>
      </div>
      
  
    </footer>
  )
}

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <About />
      <Services />
      <Doctors />
      <Footer />
    </main>
  );
}
