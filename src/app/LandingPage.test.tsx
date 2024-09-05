import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { About, Card, Doctors, Footer, Hero, NavBar, Services } from '@/app/page'
import Image from 'next/image'
import Docteur from '@/_components/svgs/Docteur'

jest.mock("../_lib/session", () => ({
    getSession: async () => null
}))

const patientSession = {
    user: {
        id: 1,
        firstName: "test",
        admin: false
    }
}

const adminSession = {
    user: {
        id: 1,
        firstName: "test",
        admin: true
    }
}

describe("Nav Bar", () => {
    it("renders the nav", () => {
        const res = render(<NavBar session={null} />)

        const nav = res.container.querySelector("nav")

        expect(nav).toBeInTheDocument()
    })

    it("renders the logo", async () => {
        render(<NavBar session={null} />)

        const logo = screen.getByRole("link", { name: "SoigneMoi" })

        expect(logo).toBeInTheDocument()
        expect(logo).toHaveAttribute("href", "/")
    })

    it("renders the home link", async () => {
        render(<NavBar session={null} />)

        const homeLink = screen.getByRole("link", { name: "Accueil" })

        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute("href", "#home")
    })

    it("renders the about link", async () => {
        render(<NavBar session={null} />)

        const aboutLink = screen.getByRole("link", { name: "A Propos" })

        expect(aboutLink).toBeInTheDocument()
        expect(aboutLink).toHaveAttribute("href", "#about")
    })

    it("renders the services link", async () => {
        render(<NavBar session={null} />)

        const servicesLink = screen.getByRole("link", { name: "Préstations" })

        expect(servicesLink).toBeInTheDocument()
        expect(servicesLink).toHaveAttribute("href", "#services")
    })

    it("renders the doctors link", async () => {
        render(<NavBar session={null} />)

        const doctorsLink = screen.getByRole("link", { name: "Nos Docteurs" })

        expect(doctorsLink).toBeInTheDocument()
        expect(doctorsLink).toHaveAttribute("href", "#doctors")
    })

    it("renders the login link", async () => {
        render(<NavBar session={null} />)

        const loginLink = screen.getByRole("link", { name: "Se Connecter" })

        expect(loginLink).toBeInTheDocument()
        expect(loginLink).toHaveAttribute("href", "/auth")
    })

    it("renders the signup link", async () => {
        render(<NavBar session={null} />)

        const signupLink = screen.getByRole("link", { name: "S'inscrire" })

        expect(signupLink).toBeInTheDocument()
        expect(signupLink).toHaveAttribute("href", "/auth?tab=signup")
    })

    it("renders the patient dashboard link", async () => {
        render(<NavBar session={patientSession} />)

        const patientDashboardLink = screen.getByRole("link", { name: "Espace Patient" })

        expect(patientDashboardLink).toBeInTheDocument()
        expect(patientDashboardLink).toHaveAttribute("href", "/patient")
    })

    it("renders the admin dashboard link", async () => {
        render(<NavBar session={adminSession} />)

        const adminDashboardLink = screen.getByRole("link", { name: "Espace Admin" })

        expect(adminDashboardLink).toBeInTheDocument()
        expect(adminDashboardLink).toHaveAttribute("href", "/admin")
    })
})

describe("Hero Section", () => {
    it("renders the section", () => {
        const res = render(<Hero session={null} />)

        const section = res.container.querySelector("section#home")

        expect(section).toBeInTheDocument()
    })

    it("renders the heading", () => {
        render(<Hero session={null} />)

        const heading = screen.getByRole("heading", { level: 2, name: "Votre bien-etre est entre nos mains" })

        expect(heading).toBeInTheDocument()
    })

    it("renders the login link", () => {
        render(<Hero session={null} />)

        const loginLink = screen.getByRole("link", { name: "Connectez vous" })

        expect(loginLink).toBeInTheDocument()
        expect(loginLink).toHaveAttribute("href", "/auth")
    })

    it("renders the patient dashboard link", () => {
        render(<Hero session={patientSession} />)

        const patientDashboardLink = screen.getByRole("link", { name: "Acceder a l'espace patient" })

        expect(patientDashboardLink).toBeInTheDocument()
        expect(patientDashboardLink).toHaveAttribute("href", "/patient")
    })

    it("renders the admin dashboard link", () => {
        render(<Hero session={adminSession} />)

        const adminDashboardLink = screen.getByRole("link", { name: "Acceder a l'espace admin" })

        expect(adminDashboardLink).toBeInTheDocument()
        expect(adminDashboardLink).toHaveAttribute("href", "/admin")
    })
})

describe("About Section", () => {
    it("renders the section", () => {
        const res = render(<About />)

        const section = res.container.querySelector("section#about")

        expect(section).toBeInTheDocument()
    })

    it("renders the heading", () => {
        render(<About />)

        const heading = screen.getByRole("heading", { level: 2, name: "A propos de nous" })

        expect(heading).toBeInTheDocument()
    })

    it("renders the image", () => {
        render(<About />)

        const img = screen.getByRole("img")

        expect(img).toBeInTheDocument()
    })

    it("renders the description", () => {
        render(<About />)

        const description = screen.getByRole("paragraph")

        expect(description).toBeInTheDocument()
    })
})

describe("Services Section", () => {
    it("renders the section", () => {
        const res = render(<Services />)

        const section = res.container.querySelector("section#services")

        expect(section).toBeInTheDocument()
    })

    it("renders the heading", () => {
        render(<Services />)

        const heading = screen.getByRole("heading", { level: 2, name: "Ce qu’on vous offre" })

        expect(heading).toBeInTheDocument()
    })
})

describe("Doctors Section", () => {
    it("renders the section", () => {
        const res = render(<Doctors />)

        const section = res.container.querySelector("section#doctors")

        expect(section).toBeInTheDocument()
    })

    it("renders the heading", () => {
        render(<Doctors />)

        const heading = screen.getByRole("heading", { level: 2, name: "Nos docteurs renommés" })

        expect(heading).toBeInTheDocument()
    })
})


describe("Card Component", () => {
    it("renders the image", () => {
        render(<Card img={<Image className="rounded-lg mb-2 mx-auto" src="/ThomasLefevre.jpg" alt="Dr. Thomas Lefevre" width={190} height={237} />} title='Test Title' description='Test Description' />)

        const img = screen.getByRole("img")

        expect(img).toBeInTheDocument()
    })

    it("renders the svg", () => {
        const res = render(<Card img={<Docteur className="text-primary mx-auto" height={100} width={110} />} title='Test Title' description='Test Description' />)

        const svg = res.container.querySelector("svg")

        expect(svg).toBeInTheDocument()
    })

    it("renders the title", () => {
        render(<Card img={<></>} title='Test Title' description='Test Description' />)

        const title = screen.getByRole("heading", { level: 3, name: "Test Title" })

        expect(title).toBeInTheDocument()
    })

    it("renders the description", () => {
        render(<Card img={<></>} title='Test Title' description='Test Description' />)

        const description = screen.getByRole("paragraph")

        expect(description).toBeInTheDocument()
        expect(description).toHaveTextContent('Test Description')
    })
})

describe("Footer", () => {
    it("renders the footer", () => {
        const res = render(<Footer />)

        const footer = res.container.querySelector("footer")

        expect(footer).toBeInTheDocument()
    })

    it("renders the logo", () => {
        render(<Footer />)

        const logo = screen.getByRole("link", { name: "SoigneMoi" })

        expect(logo).toBeInTheDocument()
        expect(logo).toHaveAttribute("href", "/")
    })

    it("renders the columns", () => {
        render(<Footer />)

        const addressColumn = screen.getByText("Adresse:")
        const phoneColumn = screen.getByText("Téléphone:")
        const emailColumn = screen.getByText("Email:")

        expect(addressColumn).toBeInTheDocument()
        expect(phoneColumn).toBeInTheDocument()
        expect(emailColumn).toBeInTheDocument()
    })
})