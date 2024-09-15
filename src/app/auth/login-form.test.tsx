import '@testing-library/jest-dom';

import { EMPTY_FORM_STATE } from '@/lib/to-form-state';
import { render, screen } from "@testing-library/react";
import { LoginForm } from './components';

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}));

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("@/actions/auth", () => ({
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

        const emailInput = screen.getByLabelText("Email")

        expect(emailInput).toBeInTheDocument()
        expect(emailInput).not.toBeDisabled()

        const passwordInput = screen.getByPlaceholderText("votre mot de passe")

        expect(passwordInput).toBeInTheDocument()
        expect(passwordInput).not.toBeDisabled()
    })

    it("renders the submit button", () => {
        render(<LoginForm />)

        const loginButton = screen.getByRole("button", { name: "Se connecter" })

        expect(loginButton).toBeInTheDocument()
        expect(loginButton).not.toBeDisabled()
    })
})