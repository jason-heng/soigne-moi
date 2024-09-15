import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { TabsLayout } from './components';
import { EMPTY_FORM_STATE } from '@/_lib/to-form-state';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("./actions", () => ({
    login: () => null
}));

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: () => { }
    })
}));

describe("Login Tab", () => {
    it("renders tab triggers", () => {
        render(<TabsLayout tab='login' />)

        const loginTabTrigger = screen.getByText("Connexion")
        const signupTabTrigger = screen.getByText("Inscription")

        expect(loginTabTrigger).toBeInTheDocument()
        expect(loginTabTrigger).toHaveAttribute("data-state", "active")

        expect(signupTabTrigger).toBeInTheDocument()
    })

    it("renders the form", () => {
        render(<TabsLayout tab='login' />)

        const loginButton = screen.getByRole("button", { name: "Se connecter" })

        expect(loginButton).toBeInTheDocument()
    })
})

describe("Signup Tab", () => {
    it("renders tab triggers", () => {
        render(<TabsLayout tab='signup' />)

        const loginTabTrigger = screen.getByText("Connexion")
        const signupTabTrigger = screen.getByText("Inscription")

        expect(loginTabTrigger).toBeInTheDocument()

        expect(signupTabTrigger).toBeInTheDocument()
        expect(signupTabTrigger).toHaveAttribute("data-state", "active")
    })

    it("renders the form", () => {
        render(<TabsLayout tab='signup' />)

        const signupButton = screen.getByRole("button", { name: "S'inscrire" })

        expect(signupButton).toBeInTheDocument()
    })
})