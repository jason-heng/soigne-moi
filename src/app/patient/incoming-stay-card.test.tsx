import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IncomingStayCard } from './components';
import { IncomingStay } from './data';

const mockStay: IncomingStay = {
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 5),
    reason: "Blessure d'essai",
    doctor: {
        firstName: "Medico",
        lastName: "DeLaSanté",
        speciality: "Chirurgien",
    },
}

describe("Incoming Stay Card", () => {
    it("renders the title", () => {
        render(<IncomingStayCard stay={null} />)

        const title = screen.getByRole("heading", { level: 3, name: "Séjour a venir" })

        expect(title).toBeInTheDocument()
    })

    it("renders the no incoming stay message", () => {
        render(<IncomingStayCard stay={null} />)

        const message = screen.getByText("Aucun séjour a venir")

        expect(message).toBeInTheDocument()
    })

    it("renders the reason", () => {
        render(<IncomingStayCard stay={mockStay} />)

        const reason = screen.getByRole("heading", { level: 3, name: mockStay.reason })

        expect(reason).toBeInTheDocument()
    })

    it("renders the date", () => {
        render(<IncomingStayCard stay={mockStay} />)

        const date = screen.getByText("01/01/2024 - 05/01/2024")

        expect(date).toBeInTheDocument()
    })

    it("renders the stay info", () => {
        render(<IncomingStayCard stay={mockStay} />)

        const specialityLabel = screen.getByText('Spécialité:')
        const speciality = screen.getByText(mockStay.doctor.speciality)
        const doctorLabel = screen.getByText('Docteur:')
        const doctor = screen.getByText(`${mockStay.doctor.firstName} ${mockStay.doctor.lastName}`)

        expect(doctorLabel).toBeInTheDocument()
        expect(doctor).toBeInTheDocument()
        expect(specialityLabel).toBeInTheDocument()
        expect(speciality).toBeInTheDocument()
    })
})