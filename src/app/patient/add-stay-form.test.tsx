import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AddStayForm } from './add-stay-form';
import { EMPTY_FORM_STATE } from '@/_lib/to-form-state';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("./actions", () => ({
    createStay: () => [() => { }, null]
}))

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}));

describe("Add Stay Form", () => {
    it("renders the title", () => {
        render(<AddStayForm doctors={[]} />)

        const title = screen.getByRole("heading", { level: 3, name: "Nouveau séjour" })

        expect(title).toBeInTheDocument()
    })

    it("renders the form", () => {
        const res = render(<AddStayForm doctors={[]} />)

        const form = res.container.querySelector("form")

        expect(form).toBeInTheDocument()
    })

    it("renders the inputs", () => {
        render(<AddStayForm doctors={[]} />)

        const reasonLabel = screen.getByText("Motif")
        const reasonInput = screen.getByPlaceholderText("Le motif de votre séjour")

        expect(reasonLabel).toBeInTheDocument()
        expect(reasonInput).toBeInTheDocument()
        expect(reasonInput).not.toBeDisabled()

        const specialityLabel = screen.getByText("Specialité")
        const specialityInput = screen.getByText("Choisir une specialité")

        expect(specialityLabel).toBeInTheDocument()
        expect(specialityInput).toBeInTheDocument()
        expect(specialityInput).not.toBeDisabled()

        const doctorLabel = screen.getByText("Docteur")
        const doctorInput = screen.getByText("Choisir un docteur")

        expect(doctorLabel).toBeInTheDocument()
        expect(doctorInput).toBeInTheDocument()
        expect(doctorInput).toBeDisabled()

        const durationLabel = screen.getByText("Durée")
        const durationInput = screen.getByText("Choisir une durée")

        expect(durationLabel).toBeInTheDocument()
        expect(durationInput).toBeInTheDocument()
        expect(durationInput).toBeDisabled()
    })

    it("renders the submit button", () => {
        render(<AddStayForm doctors={[]} />)

        const submitButton = screen.getByRole("button", { name: "Ajouter" })

        expect(submitButton).toBeInTheDocument()
    })

    it("renders the disabled submit button", () => {
        render(<AddStayForm doctors={[]} disabled />)

        const submitButton = screen.getByRole("button", { name: "Séjour en cours ou a venir" })

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeDisabled()
    })
})