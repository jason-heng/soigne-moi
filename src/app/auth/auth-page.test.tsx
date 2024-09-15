import '@testing-library/jest-dom';

import { EMPTY_FORM_STATE } from '@/lib/to-form-state';
import { render, screen } from "@testing-library/react";
import AuthPage from "./page";

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("@/actions/auth", () => ({
    login: () => null
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}));

describe("Auth Page", () => {
    it("renders the logo", () => {
        render(<AuthPage />)

        const logo = screen.getByRole("link", { name: "SoigneMoi" })

        expect(logo).toBeInTheDocument()
        expect(logo).toHaveAttribute("href", "/")
    })

    it("renders welcome heading", () => {
        render(<AuthPage />)

        const welcomeHeading = screen.getByRole("heading", { level: 2, name: "Bienvenue !" })

        expect(welcomeHeading).toBeInTheDocument()
    })

    it("reacts to search params: login", () => {
        render(<AuthPage searchParams={{ tab: "login" }} />)

        const loginTabTrigger = screen.getByText("Connexion")

        expect(loginTabTrigger).toBeInTheDocument()
        expect(loginTabTrigger).toHaveAttribute("data-state", "active")
    })

    it("reacts to search params: signup", () => {
        render(<AuthPage searchParams={{ tab: "signup" }} />)

        const signupTabTrigger = screen.getByText("Inscription")

        expect(signupTabTrigger).toBeInTheDocument()
        expect(signupTabTrigger).toHaveAttribute("data-state", "active")
    })

    it("reacts to search params: other", () => {
        render(<AuthPage searchParams={{ tab: "test" }} />)

        const loginTabTrigger = screen.getByText("Connexion")

        expect(loginTabTrigger).toBeInTheDocument()
        expect(loginTabTrigger).toHaveAttribute("data-state", "active")
    })

    it("reacts to search params: undefined", () => {
        render(<AuthPage />)

        const loginTabTrigger = screen.getByText("Connexion")

        expect(loginTabTrigger).toBeInTheDocument()
        expect(loginTabTrigger).toHaveAttribute("data-state", "active")
    })
})