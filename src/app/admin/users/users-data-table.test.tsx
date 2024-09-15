import '@testing-library/jest-dom';

import { DataTable } from '@/components/ui/data-table';
import { EMPTY_FORM_STATE } from '@/lib/to-form-state';
import { render, screen, within } from '@testing-library/react';
import { UserColumn, usersColumns } from './columns';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}));

jest.mock("./actions", () => ({
    setAdmin: () => null
}))

describe("Admin Users Page", () => {
    it("renders the no users message", async () => {
        const mockUsers: UserColumn[] = []

        render(<DataTable columns={usersColumns} data={mockUsers} notFoundPlaceholder='Aucun utilisateur.' />)

        const text = screen.getByText("Aucun utilisateur.")

        expect(text).toBeInTheDocument()
    })

    it("renders the users", async () => {
        const mockUsers: UserColumn[] = [
            {
                id: 1,
                address: "John Doe's House",
                lastName: "Doe",
                firstName: "John",
                email: "john.doe@example.com",
                admin: false,
                me: false
            },
            {
                id: 2,
                address: "Max Low's House",
                lastName: "Low",
                firstName: "Max",
                email: "max.low@example.com",
                admin: true,
                me: false
            },
            {
                id: 3,
                address: "Min High's House",
                lastName: "High",
                firstName: "Min",
                email: "min.high@example.com",
                admin: true,
                me: true
            },
        ]

        render(<DataTable columns={usersColumns} data={mockUsers} notFoundPlaceholder='Aucun utilisateur.' />)

        const rows = screen.getAllByRole("row")
        expect(rows).toHaveLength(mockUsers.length + 1) // +1 for the header row

        mockUsers.forEach(user => {
            const row = screen.getByText(user.email).closest("tr")
            expect(row).toBeInTheDocument()

            if (row) {
                const cells = within(row).getAllByRole("cell")
                expect(cells).toHaveLength(usersColumns.length)

                expect(cells[0]).toHaveTextContent(user.id.toString())
                expect(cells[1]).toHaveTextContent(user.lastName)
                expect(cells[2]).toHaveTextContent(user.firstName)
                expect(cells[3]).toHaveTextContent(user.email)
                expect(cells[4]).toHaveTextContent(user.address)

                const checkbox = within(cells[5]).getByRole("checkbox")

                expect(checkbox).toBeInTheDocument()
                if (user.admin) {
                    expect(checkbox).toBeChecked()

                    if (user.me) {
                        expect(checkbox).toBeDisabled()
                    } else {
                        expect(checkbox).not.toBeDisabled()
                    }
                } else {
                    expect(checkbox).not.toBeChecked()
                }
            }
        })
    })
})