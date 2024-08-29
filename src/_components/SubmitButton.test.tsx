import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import SubmitButton from "./SubmitButton"
import { useFormStatus } from 'react-dom'; // Ensure correct import path if you're using it

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormStatus: jest.fn()
}));

describe("Submit Button", () => {
    it("renders the button", () => {
        (useFormStatus as jest.Mock).mockReturnValue({ pending: false })

        render(<SubmitButton>Test</SubmitButton>)

        const button = screen.getByRole("button", { name: "Test" })

        expect(button).toBeInTheDocument()
    })

    it("disables when disabled", () => {
        (useFormStatus as jest.Mock).mockReturnValue({ pending: false })

        render(<SubmitButton disabled={true}>Test</SubmitButton>)

        const button = screen.getByRole("button", { name: "Test" })

        expect(button).toBeInTheDocument()
        expect(button).toBeDisabled()
    })

    it("loads when pending", () => {
        (useFormStatus as jest.Mock).mockReturnValue({ pending: true })

        render(<SubmitButton>Test</SubmitButton>)

        const button = screen.getByRole("button", { name: "Chargement..." })

        expect(button).toBeInTheDocument()
        expect(button).toBeDisabled()
    })
})