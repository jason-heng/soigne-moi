import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import AdminUsersPage from './page';

jest.mock("@/data/users", () => ({
    getUser: () => null,
    getUsers: () => []
}))

jest.mock("./actions", () => ({
    setAdmin: () => null
}))

describe("Admin Users Page", () => {
    it("renders the heading", async () => {
        render(await AdminUsersPage())

        const heading = screen.getByRole("heading", { level: 1, name: "Géstion des utilisateurs" })

        expect(heading).toBeInTheDocument()
    })
})