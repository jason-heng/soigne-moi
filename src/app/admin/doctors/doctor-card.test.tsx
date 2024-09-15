import '@testing-library/jest-dom';

import { getDoctor } from '@/data/doctors';
import { EMPTY_FORM_STATE } from '@/lib/to-form-state';
import { render, screen } from '@testing-library/react';
import { DoctorCard } from './server-components';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}));

jest.mock("./actions", () => ({
    editTimeTable: () => null,
    editDoctorPassword: () => null,
    removeDoctor: () => null,
}))

const mockDoctor: NonNullable<Awaited<ReturnType<typeof getDoctor>>> = {
    id: 1,
    firstName: "Thomas",
    lastName: "Lefevre",
    registrationNumber: 10000234,
    speciality: "Chirurgien",
    worksFriday: false,
    worksMonday: false,
    worksSaturday: false,
    worksSunday: false,
    worksThursday: false,
    worksTuesday: false,
    worksWednesday: false
}

describe("Doctor Card", () => {
    it("renders the doctor's firstName and lastName", async () => {
        render(<DoctorCard doctor={mockDoctor} />)

        const name = screen.getByRole("heading", { level: 4, name: `${mockDoctor.firstName} ${mockDoctor.lastName}` })

        expect(name).toBeInTheDocument()
    })

    it("renders the doctor's info", async () => {
        render(<DoctorCard doctor={mockDoctor} />)

        const specialityLabel = screen.getByText("Spécialité:")
        const registrationNumberLabel = screen.getByText("Matricule:")

        const speciality = screen.getByText(mockDoctor.speciality)
        const registrationNumber = screen.getByText(mockDoctor.registrationNumber)

        expect(specialityLabel).toBeInTheDocument()
        expect(registrationNumberLabel).toBeInTheDocument()
        expect(speciality).toBeInTheDocument()
        expect(registrationNumber).toBeInTheDocument()
    })

    it("renders the buttons", async () => {
        render(<DoctorCard doctor={mockDoctor} />)

        const editTimeTableButton = screen.getByRole("button", { name: "Emploi du temps" })
        const editPasswordButton = screen.getByRole("button", { name: "Modifier le mot de passe" })
        const removeDoctorButton = screen.getByRole("button", { name: "Retirer" })

        expect(editTimeTableButton).toBeInTheDocument()
        expect(editTimeTableButton).not.toBeDisabled()
        expect(editPasswordButton).toBeInTheDocument()
        expect(editPasswordButton).not.toBeDisabled()
        expect(removeDoctorButton).toBeInTheDocument()
        expect(removeDoctorButton).not.toBeDisabled()

    })
})