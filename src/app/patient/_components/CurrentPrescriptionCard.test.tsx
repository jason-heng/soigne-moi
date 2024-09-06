import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CurrentStay } from '../data';
import { CurrentPrescriptionCard } from './CurrentPrescriptionCard';

const mockStay: CurrentStay = {
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 5),
    reason: "Blessure d'essai",
    doctor: {
        firstName: "Medico",
        lastName: "DeLaSanté",
        speciality: "Chirurgien",
    },
    prescription: {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 7),
        drugs: []
    }
}

describe("Current Prescription Card", () => {
    it("renders the title", () => {
        render(<CurrentPrescriptionCard stay={null} />)

        const title = screen.getByRole("heading", { level: 3, name: "Préscription actuelle" })

        expect(title).toBeInTheDocument()
    })

    it("renders the no current stay message", () => {
        render(<CurrentPrescriptionCard stay={null} />)

        const message = screen.getByText("Aucun séjour en cours")

        expect(message).toBeInTheDocument()
    })

    it("renders the no current prescription message", () => {
        const thisMockStay: CurrentStay = { ...mockStay, prescription: null }

        render(<CurrentPrescriptionCard stay={thisMockStay} />)

        const message = screen.getByText("Aucune préscription en cours")

        expect(message).toBeInTheDocument()
    })

    it("renders the no drugs for the moment message", () => {
        render(<CurrentPrescriptionCard stay={mockStay} />)

        const message = screen.getByText("Aucun médicament pour l'instant")

        expect(message).toBeInTheDocument()
    })

    it("renders the date", () => {
        render(<CurrentPrescriptionCard stay={mockStay} />)

        const date = screen.getByText("01/01/2024 - 07/01/2024")

        expect(date).toBeInTheDocument()
    })

    it("renders the drugs info", () => {
        const mockDrugs = [
            {
                id: 1,
                name: "Paracétamol",
                dosage: "3x par jour"
            },
            {
                id: 2,
                name: "Jus d'orange",
                dosage: "4x par jour"
            },
            {
                id: 3,
                name: "Ibuprofen",
                dosage: "apres chaque repas"
            },
            {
                id: 4,
                name: "Alcohol",
                dosage: "matin midi et soir"
            },
        ]

        const thisMockStay: CurrentStay = mockStay
        thisMockStay.prescription = {
            start: new Date(),
            end: new Date(),
            drugs: mockDrugs
        }

        render(<CurrentPrescriptionCard stay={thisMockStay} />)

        mockDrugs.forEach(mockDrug => {
            const name = screen.getByRole("heading", { level: 3, name: mockDrug.name })
            const dosage = screen.getByText(mockDrug.dosage)

            expect(name).toBeInTheDocument()
            expect(dosage).toBeInTheDocument()
        })
    })
})