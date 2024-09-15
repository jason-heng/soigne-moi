import '@testing-library/jest-dom';

import { EMPTY_FORM_STATE } from '@/lib/to-form-state';
import { render, screen } from "@testing-library/react";
import EditInfoForm from "./edit-info-form";

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("./actions", () => ({
    editInfo: () => null
}))

const mockUser = {
    firstName: "test",
    lastName: "test",
    email: "test",
    address: "test",
}

describe("Edit Info Form", () => {
    it("renders the heading", () => {
        render(<EditInfoForm {...mockUser} />)

        const heading = screen.getByRole("heading", { level: 2, name: "Informations personnelles" })

        expect(heading).toBeInTheDocument()
    })

    it("renders the form", () => {
        const res = render(<EditInfoForm {...mockUser} />)

        const form = res.container.querySelector("form")

        expect(form).toBeInTheDocument()
    })

    it("renders the inputs", () => {
        render(<EditInfoForm {...mockUser} />)

        const firstNameLabel = screen.getByText("Votre prénom:")
        const firstNameInput = screen.getByPlaceholderText("Entrez un prénom...")

        expect(firstNameLabel).toBeInTheDocument()
        expect(firstNameInput).toBeInTheDocument()
        expect(firstNameInput).not.toBeDisabled()
        expect(firstNameInput).toHaveValue(mockUser.firstName)

        const lastNameLabel = screen.getByText("Votre nom:")
        const lastNameInput = screen.getByPlaceholderText("Entrez un nom...")

        expect(lastNameLabel).toBeInTheDocument()
        expect(lastNameInput).toBeInTheDocument()
        expect(lastNameInput).not.toBeDisabled()
        expect(lastNameInput).toHaveValue(mockUser.lastName)

        const emailLabel = screen.getByText("Votre email:")
        const emailInput = screen.getByPlaceholderText("Entrez un email...")

        expect(emailLabel).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(emailInput).not.toBeDisabled()
        expect(emailInput).toHaveValue(mockUser.email)

        const addressLabel = screen.getByText("Votre adresse:")
        const addressInput = screen.getByPlaceholderText("Entrez une adresse...")

        expect(addressLabel).toBeInTheDocument()
        expect(addressInput).toBeInTheDocument()
        expect(addressInput).not.toBeDisabled()
        expect(addressInput).toHaveValue(mockUser.address)
    })

    it("renders the submit button", () => {
        render(<EditInfoForm {...mockUser} />)

        const submitButton = screen.getByRole("button", { name: "Sauvegarder" })

        expect(submitButton).toBeInTheDocument()
    })
})