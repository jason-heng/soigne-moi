import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DoctorsList from './DoctorsList';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [() => { }, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("../actions", () => ({
    editTimeTable: () => null,
    editDoctorPassword: () => null,
    removeDoctor: () => null,
}))

describe("Doctor List", () => {
    it("renders the heading", async () => {
        render(<DoctorsList doctors={[]} />)

        const heading = screen.getByRole("heading", { level: 3, name: "Liste des docteurs" })

        expect(heading).toBeInTheDocument()
    })

    it("renders the search bar", async () => {
        render(<DoctorsList doctors={[]} />)

        const searchBar = screen.getByPlaceholderText("Rechercher...")

        expect(searchBar).toBeInTheDocument()
    })
})