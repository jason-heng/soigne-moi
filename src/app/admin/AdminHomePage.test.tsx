import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AdminHome, { DoctorsCard, PatientsCard, SecretariesCard, StaysCard, StaysEvolutionCard } from './page';
import { getStays } from '@/_data/stays';
import { Stay } from '@prisma/client';

jest.mock("../../_data/users", () => ({
    getUser: () => ({ firstName: "John" }),
    countUsers: jest.fn(),
}))

jest.mock("../../_data/secretaries", () => ({
    countSecretaries: jest.fn(),
}))

jest.mock("../../_data/doctors", () => ({
    countDoctors: jest.fn(),
}))

jest.mock("../../_data/stays", () => ({
    getStays: jest.fn(),
}));

(getStays as jest.Mock).mockReturnValue([])

class MockResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

describe("Admin Page", () => {
    window.ResizeObserver = MockResizeObserver as any;

    it("renders the heading", async () => {
        render(await AdminHome())

        const heading = screen.getByRole("heading", { level: 1, name: "Bonjour, John !" })

        expect(heading).toBeInTheDocument()
    })
})

describe("Patients Card", () => {
    it("renders the title", () => {
        render(<PatientsCard patientsNumber={3} />)

        const title = screen.getByRole("heading", { level: 3, name: "Patients" })

        expect(title).toBeInTheDocument()
    })

    it("renders no patients", () => {
        render(<PatientsCard patientsNumber={0} />)

        const text = screen.getByText("Aucun patient")

        expect(text).toBeInTheDocument()
    })

    it("renders 1 patient", () => {
        render(<PatientsCard patientsNumber={1} />)

        const text = screen.getByText("1 patient")

        expect(text).toBeInTheDocument()
    })

    it("renders multiple patients", () => {
        render(<PatientsCard patientsNumber={3} />)

        const text = screen.getByText("3 patients")

        expect(text).toBeInTheDocument()
    })

    it("renders the button", () => {
        render(<PatientsCard patientsNumber={3} />)

        const link = screen.getByRole("link", { name: "Voir plus" })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/admin/users")
    })
})

describe("Doctors Card", () => {
    it("renders the title", () => {
        render(<DoctorsCard doctorsNumber={3} />)

        const title = screen.getByRole("heading", { level: 3, name: "Docteurs" })

        expect(title).toBeInTheDocument()
    })

    it("renders no doctors", () => {
        render(<DoctorsCard doctorsNumber={0} />)

        const text = screen.getByText("Aucun docteur")

        expect(text).toBeInTheDocument()
    })

    it("renders 1 doctor", () => {
        render(<DoctorsCard doctorsNumber={1} />)

        const text = screen.getByText("1 docteur")

        expect(text).toBeInTheDocument()
    })

    it("renders multiple doctors", () => {
        render(<DoctorsCard doctorsNumber={3} />)

        const text = screen.getByText("3 docteurs")

        expect(text).toBeInTheDocument()
    })

    it("renders the button", () => {
        render(<DoctorsCard doctorsNumber={3} />)

        const link = screen.getByRole("link", { name: "Voir plus" })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/admin/doctors")
    })
})

describe("Secretaries Card", () => {
    it("renders the title", () => {
        render(<SecretariesCard secretariesNumber={3} />)

        const title = screen.getByRole("heading", { level: 3, name: "Secrétaires" })

        expect(title).toBeInTheDocument()
    })

    it("renders no secretaries", () => {
        render(<SecretariesCard secretariesNumber={0} />)

        const text = screen.getByText("Aucune secrétaire")

        expect(text).toBeInTheDocument()
    })

    it("renders 1 secretary", () => {
        render(<SecretariesCard secretariesNumber={1} />)

        const text = screen.getByText("1 secrétaire")

        expect(text).toBeInTheDocument()
    })

    it("renders multiple secretaries", () => {
        render(<SecretariesCard secretariesNumber={3} />)

        const text = screen.getByText("3 secrétaires")

        expect(text).toBeInTheDocument()
    })

    it("renders the button", () => {
        render(<SecretariesCard secretariesNumber={3} />)

        const link = screen.getByRole("link", { name: "Voir plus" })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/admin/secretaries")
    })
})

describe("Stays Card", () => {
    it("renders the title", () => {
        render(<StaysCard stays={[]} />)

        const title = screen.getByRole("heading", { level: 3, name: "Séjours" })

        expect(title).toBeInTheDocument()
    })

    it("renders labels", () => {
        render(<StaysCard stays={[]} />)

        const endedStays = screen.getByText("Passés: Aucun séjour")
        const ongoingStays = screen.getByText("En cours: Aucun séjour")
        const upcomingStays = screen.getByText("A venir: Aucun séjour")
        const thisMonthStays = screen.getByText("Ce mois: Aucun séjour")
        const totalStays = screen.getByText("Au total: Aucun séjour")

        expect(endedStays).toBeInTheDocument()
        expect(ongoingStays).toBeInTheDocument()
        expect(upcomingStays).toBeInTheDocument()
        expect(thisMonthStays).toBeInTheDocument()
        expect(totalStays).toBeInTheDocument()
    })

    it("renders 1 ongoing, 1 this month and 1 total", () => {
        const mockStays: Stay[] = [
            {
                doctorId: 1,
                id: 1,
                patientId: 1,
                prescriptionId: 1,
                reason: "",
                start: new Date(new Date().setDate(new Date().getDate() - 1)),
                end: new Date(new Date().setDate(new Date().getDate() + 1))
            }
        ]

        render(<StaysCard stays={mockStays} />)

        const ongoingStays = screen.getByText("En cours: 1 séjour")
        const thisMonthStays = screen.getByText("Ce mois: 1 séjour")
        const totalStays = screen.getByText("Au total: 1 séjour")

        expect(ongoingStays).toBeInTheDocument()
        expect(thisMonthStays).toBeInTheDocument()
        expect(totalStays).toBeInTheDocument()
    })

    it("renders multiple ongoing, multiple this month and multiple total", () => {
        const mockStays: Stay[] = [
            {
                doctorId: 1,
                id: 1,
                patientId: 1,
                prescriptionId: 1,
                reason: "",
                start: new Date(new Date().setDate(new Date().getDate() - 1)),
                end: new Date(new Date().setDate(new Date().getDate() + 1))
            },
            {
                doctorId: 1,
                id: 1,
                patientId: 1,
                prescriptionId: 1,
                reason: "",
                start: new Date(new Date().setDate(new Date().getDate() - 1)),
                end: new Date(new Date().setDate(new Date().getDate() + 1))
            }
        ]

        render(<StaysCard stays={mockStays} />)

        const ongoingStays = screen.getByText("En cours: 2 séjours")
        const thisMonthStays = screen.getByText("Ce mois: 2 séjours")
        const totalStays = screen.getByText("Au total: 2 séjours")

        expect(ongoingStays).toBeInTheDocument()
        expect(thisMonthStays).toBeInTheDocument()
        expect(totalStays).toBeInTheDocument()
    })

    it("renders 1 ended and 1 upcoming", () => {
        const mockStays: Stay[] = [
            {
                doctorId: 1,
                id: 1,
                patientId: 1,
                prescriptionId: 1,
                reason: "",
                start: new Date(new Date().setDate(new Date().getDate() - 2)),
                end: new Date(new Date().setDate(new Date().getDate() - 1))
            },
            {
                doctorId: 1,
                id: 1,
                patientId: 1,
                prescriptionId: 1,
                reason: "",
                start: new Date(new Date().setDate(new Date().getDate() + 1)),
                end: new Date(new Date().setDate(new Date().getDate() + 2))
            }
        ]

        render(<StaysCard stays={mockStays} />)

        const passedStays = screen.getByText("Passés: 1 séjour")
        const upcomingStays = screen.getByText("A venir: 1 séjour")

        expect(passedStays).toBeInTheDocument()
        expect(upcomingStays).toBeInTheDocument()
    })

    it("renders multiple ended and multiple upcoming", () => {
        const mockStays: Stay[] = [
            {
                doctorId: 1,
                id: 1,
                patientId: 1,
                prescriptionId: 1,
                reason: "",
                start: new Date(new Date().setDate(new Date().getDate() - 2)),
                end: new Date(new Date().setDate(new Date().getDate() - 1))
            },
            {
                doctorId: 1,
                id: 1,
                patientId: 1,
                prescriptionId: 1,
                reason: "",
                start: new Date(new Date().setDate(new Date().getDate() - 2)),
                end: new Date(new Date().setDate(new Date().getDate() - 1))
            },
            {
                doctorId: 1,
                id: 1,
                patientId: 1,
                prescriptionId: 1,
                reason: "",
                start: new Date(new Date().setDate(new Date().getDate() + 1)),
                end: new Date(new Date().setDate(new Date().getDate() + 2))
            },
            {
                doctorId: 1,
                id: 1,
                patientId: 1,
                prescriptionId: 1,
                reason: "",
                start: new Date(new Date().setDate(new Date().getDate() + 1)),
                end: new Date(new Date().setDate(new Date().getDate() + 2))
            }
        ]

        render(<StaysCard stays={mockStays} />)

        const passedStays = screen.getByText("Passés: 2 séjours")
        const upcomingStays = screen.getByText("A venir: 2 séjours")

        expect(passedStays).toBeInTheDocument()
        expect(upcomingStays).toBeInTheDocument()
    })
})