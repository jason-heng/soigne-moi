import '@testing-library/jest-dom';

import { DataTable } from '@/components/ui/data-table';
import { EMPTY_FORM_STATE } from '@/lib/to-form-state';
import { render, screen, within } from '@testing-library/react';
import { SecretaryColumn, secretariesColumns } from './columns';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("./actions", () => ({
    editSecretaryPassword: () => null,
    removeSecretary: () => null
}))

describe("Admin Secretaries Page", () => {
    it("renders the no users message", async () => {
        const mockSecretaries: SecretaryColumn[] = []

        render(<DataTable columns={secretariesColumns} data={mockSecretaries} notFoundPlaceholder='Aucune secrétaire.' />)

        const text = screen.getByText("Aucune secrétaire.")

        expect(text).toBeInTheDocument()
    })

    it("renders the users", async () => {
        const mockSecretaries: SecretaryColumn[] = [
            {
                id: 1,
                lastName: "Doe",
                firstName: "John",
                email: "john.doe@example.com",
            },
            {
                id: 2,
                lastName: "Low",
                firstName: "Max",
                email: "max.low@example.com",
            },
            {
                id: 3,
                lastName: "High",
                firstName: "Min",
                email: "min.high@example.com",
            },
        ]

        render(<DataTable columns={secretariesColumns} data={mockSecretaries} notFoundPlaceholder='Aucune secrétaire.' />)

        const rows = screen.getAllByRole("row")
        expect(rows).toHaveLength(mockSecretaries.length + 1) // +1 for the header row

        mockSecretaries.forEach(user => {
            const row = screen.getByText(user.email).closest("tr")
            expect(row).toBeInTheDocument()

            if (row) {
                const cells = within(row).getAllByRole("cell")
                expect(cells).toHaveLength(secretariesColumns.length)

                expect(cells[0]).toHaveTextContent(user.id.toString())
                expect(cells[1]).toHaveTextContent(user.lastName)
                expect(cells[2]).toHaveTextContent(user.firstName)
                expect(cells[3]).toHaveTextContent(user.email)
            }
        })
    })
})