import { getSession } from "@/_lib/session";
import { About, Doctors, Footer, Hero, NavBar, Services } from "./components";

export default async function LandingPage() {
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
