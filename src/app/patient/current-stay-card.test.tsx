import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { CurrentStayCard } from './components';
import { CurrentStay } from './data';

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

describe("Current Stay Card", () => {
    it("renders the title", () => {
        render(<CurrentStayCard stay={null} />)

        const title = screen.getByRole("heading", { level: 3, name: "Séjour actuel" })

        expect(title).toBeInTheDocument()
    })

    it("renders the no current stay message", () => {
        render(<CurrentStayCard stay={null} />)

        const message = screen.getByText("Aucun séjour en cours")

        expect(message).toBeInTheDocument()
    })

    it("renders the date", () => {
        render(<CurrentStayCard stay={mockStay} />)

        const date = screen.getByText("01/01/2024 - 05/01/2024")

        expect(date).toBeInTheDocument()
    })

    it("renders the stay info", () => {
        render(<CurrentStayCard stay={mockStay} />)

        const reasonLabel = screen.getByText('Motif:')
        const reason = screen.getByText(mockStay.reason)
        const specialityLabel = screen.getByText('Spécialité:')
        const speciality = screen.getByText(mockStay.doctor.speciality)
        const doctorLabel = screen.getByText('Docteur:')
        const doctor = screen.getByText(`${mockStay.doctor.firstName} ${mockStay.doctor.lastName}`)

        expect(reasonLabel).toBeInTheDocument()
        expect(reason).toBeInTheDocument()
        expect(specialityLabel).toBeInTheDocument()
        expect(speciality).toBeInTheDocument()
        expect(doctorLabel).toBeInTheDocument()
        expect(doctor).toBeInTheDocument()

    })
})