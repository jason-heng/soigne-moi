import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import AuthPage from "./page"
import { useSearchParams } from "next/navigation";

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [() => { }, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("./actions", () => ({
    login: async (_: any, formData: FormData) => null
}));

jest.mock("next/navigation", () => ({
    useSearchParams: jest.fn()
}));

describe("Auth Page", () => {
    it("renders the logo", () => {
        (useSearchParams as jest.Mock).mockReturnValue({
            get: () => null
        })

        render(<AuthPage />)

        const logo = screen.getByRole("link", { name: "SoigneMoi" })

        expect(logo).toBeInTheDocument()
        expect(logo).toHaveAttribute("href", "/")
    })

    it("renders welcome heading", () => {
        (useSearchParams as jest.Mock).mockReturnValue({
            get: () => null
        })

        render(<AuthPage />)

        const welcomeHeading = screen.getByRole("heading", { level: 2, name: "Bienvenue !" })

        expect(welcomeHeading).toBeInTheDocument()
    })

    it("renders welcome message", () => {
        (useSearchParams as jest.Mock).mockReturnValue({
            get: () => null
        })

        render(<AuthPage />)

        const welcomeMessage = screen.getByRole("paragraph")

        expect(welcomeMessage).toBeInTheDocument()
        expect(welcomeMessage).toHaveTextContent("Heureux de vous voir parmi nous !")
    })
})