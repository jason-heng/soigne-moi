import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AddDoctorForm from './AddDoctorForm';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [() => { }, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("../actions", () => ({
    addDoctor: () => null,
}))

describe("Add Doctor Form", () => {
    it("renders the heading", async () => {
        render(<AddDoctorForm />)

        const heading = screen.getByRole("heading", { level: 3, name: "Ajouter un docteur" })

        expect(heading).toBeInTheDocument()
    })

    it("renders the inputs", async () => {
        render(<AddDoctorForm />)

        const lastNameLabel = screen.getByText("Nom");
        const firstNameLabel = screen.getByText("Prénom");
        const specialityLabel = screen.getByText("Specialité");
        const registrationNumberLabel = screen.getByText("Matricule");
        const passwordLabel = screen.getByText("Mot de passe");

        expect(lastNameLabel).toBeInTheDocument();
        expect(firstNameLabel).toBeInTheDocument();
        expect(specialityLabel).toBeInTheDocument();
        expect(registrationNumberLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();

        const lastNameInput = screen.getByPlaceholderText("Le nom du docteur");
        const firstNameInput = screen.getByPlaceholderText("Le prénom du docteur");
        const specialityInput = screen.getByPlaceholderText("La specialité du docteur");
        const registrationNumberInput = screen.getByPlaceholderText("Le matricule du docteur");
        const passwordInput = screen.getByPlaceholderText("Le mot de passe du docteur");

        expect(lastNameInput).toBeInTheDocument();
        expect(firstNameInput).toBeInTheDocument();
        expect(specialityInput).toBeInTheDocument();
        expect(registrationNumberInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    })

    it("renders the submit button", () => {
        render(<AddDoctorForm />)

        const submitButton = screen.getByRole("button", { name: "Ajouter" })

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).not.toBeDisabled();
    })
})