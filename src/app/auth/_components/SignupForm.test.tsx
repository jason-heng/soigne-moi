import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { SignupForm } from './SignupForm';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [() => { }, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("../actions", () => ({
    login: () => null
}));

describe("Signup Form", () => {
    it("renders the form", () => {
        const res = render(<SignupForm />)

        const form = res.container.querySelector("form")

        expect(form).toBeInTheDocument()
    })

    it("renders the inputs", () => {
        render(<SignupForm />)

        const firstNameInput = screen.getByPlaceholderText("Prénom")

        expect(firstNameInput).toBeInTheDocument()
        expect(firstNameInput).not.toBeDisabled()

        const lastNameInput = screen.getByPlaceholderText("Nom")

        expect(lastNameInput).toBeInTheDocument()
        expect(lastNameInput).not.toBeDisabled()

        const emailInput = screen.getByPlaceholderText("Email")

        expect(emailInput).toBeInTheDocument()
        expect(emailInput).not.toBeDisabled()

        const addressInput = screen.getByPlaceholderText("Adresse")

        expect(addressInput).toBeInTheDocument()
        expect(addressInput).not.toBeDisabled()

        const passwordInput = screen.getByPlaceholderText("Mot de passe")

        expect(passwordInput).toBeInTheDocument()
        expect(passwordInput).not.toBeDisabled()

        const repeatPasswordInput = screen.getByPlaceholderText("Répéter mot de passe")

        expect(repeatPasswordInput).toBeInTheDocument()
        expect(repeatPasswordInput).not.toBeDisabled()
    })

    it("renders the submit button", () => {
        render(<SignupForm />)

        const signupButton = screen.getByRole("button", { name: "S'inscrire" })

        expect(signupButton).toBeInTheDocument()
        expect(signupButton).not.toBeDisabled()
    })
})