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
        const lastNameInput = screen.getByPlaceholderText("Nom")
        const emailInput = screen.getByPlaceholderText("Email")
        const addressInput = screen.getByPlaceholderText("Adresse")
        const passwordInput = screen.getByPlaceholderText("Mot de passe")
        const repeatPasswordInput = screen.getByPlaceholderText("Répéter mot de passe")

        expect(firstNameInput).toBeInTheDocument()
        expect(lastNameInput).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(addressInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(repeatPasswordInput).toBeInTheDocument()
    })

    it("renders the button", () => {
        render(<SignupForm />)

        const signupButton = screen.getByRole("button", { name: "S'inscrire" })

        expect(signupButton).toBeInTheDocument()
    })
})