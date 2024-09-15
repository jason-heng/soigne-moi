import '@testing-library/jest-dom';

import { EMPTY_FORM_STATE } from '@/lib/to-form-state';
import { render, screen } from "@testing-library/react";
import EditPasswordForm from "./edit-password-form";

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("./actions", () => ({
    editPassword: () => null
}))

describe("Edit Password Form", () => {
    it("renders the heading", () => {
        render(<EditPasswordForm />)

        const heading = screen.getByRole("heading", { level: 2, name: "Changement de mot de passe" })

        expect(heading).toBeInTheDocument()
    })

    it("renders the form", () => {
        const res = render(<EditPasswordForm />)

        const form = res.container.querySelector("form")

        expect(form).toBeInTheDocument()
    })

    it("renders the inputs", () => {
        render(<EditPasswordForm />)

        const newPasswordLabel = screen.getByText("Nouveau mot de passe:")
        const newPasswordInput = screen.getByPlaceholderText("Entrez un nouveau mot de passe...")

        expect(newPasswordLabel).toBeInTheDocument()
        expect(newPasswordInput).not.toBeDisabled()
        expect(newPasswordInput).toBeInTheDocument()

        const repeatNewPasswordLabel = screen.getByText("Confirmer le mot de passe:")
        const repeatNewPasswordInput = screen.getByPlaceholderText("Répétez le nouveau mot de passe...")

        expect(repeatNewPasswordLabel).toBeInTheDocument()
        expect(repeatNewPasswordInput).not.toBeDisabled()
        expect(repeatNewPasswordInput).toBeInTheDocument()

        const passwordLabel = screen.getByText("Mot de passe actuel:")
        const passwordInput = screen.getByPlaceholderText("Entrez votre mot de passe actuel...")

        expect(passwordLabel).toBeInTheDocument()
        expect(passwordInput).not.toBeDisabled()
        expect(passwordInput).toBeInTheDocument()
    })

    it("renders the submit button", () => {
        render(<EditPasswordForm />)

        const submitButton = screen.getByRole("button", { name: "Changer le mot de passe" })

        expect(submitButton).toBeInTheDocument()
    })
})