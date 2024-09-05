import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AddSecretaryForm from './AddSecretaryForm';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [() => { }, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("../actions", () => ({
    addSecretary: () => null,
}))

describe("Add Secretary Form", () => {
    it("renders the heading", async () => {
        render(<AddSecretaryForm />)

        const heading = screen.getByRole("heading", { level: 3, name: "Ajouter une secrétaire" })

        expect(heading).toBeInTheDocument()
    })

    it("renders the inputs", async () => {
        render(<AddSecretaryForm />)

        const lastNameLabel = screen.getByText("Nom");
        const firstNameLabel = screen.getByText("Prénom");
        const emailLabel = screen.getByText("Email");
        const passwordLabel = screen.getByText("Mot de passe");

        expect(lastNameLabel).toBeInTheDocument();
        expect(firstNameLabel).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();

        const lastNameInput = screen.getByPlaceholderText("Le nom de la secrétaire");
        const firstNameInput = screen.getByPlaceholderText("Le prénom de la secrétaire");
        const emailInput = screen.getByPlaceholderText("L'email de la secrétaire");
        const passwordInput = screen.getByPlaceholderText("Le mot de passe de la secrétaire");

        expect(lastNameInput).toBeInTheDocument();
        expect(firstNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    })

    it("renders the submit button", () => {
        render(<AddSecretaryForm />)

        const submitButton = screen.getByRole("button", { name: "Ajouter" })

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).not.toBeDisabled();
    })
})