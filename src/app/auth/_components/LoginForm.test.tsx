import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { LoginForm } from './LoginForm';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [() => { }, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("../actions", () => ({
    login: () => null
}));

describe("Login Form", () => {
    it("renders the form", () => {
        const res = render(<LoginForm />)

        const form = res.container.querySelector("form")

        expect(form).toBeInTheDocument()
    })

    it("renders the inputs", () => {
        render(<LoginForm />)

        const emailInput = screen.getByPlaceholderText("Email")
        const passwordInput = screen.getByPlaceholderText("Mot de passe")

        expect(emailInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
    })

    it("renders the button", () => {
        render(<LoginForm />)

        const loginButton = screen.getByRole("button", { name: "Se Connecter" })

        expect(loginButton).toBeInTheDocument()
    })
})