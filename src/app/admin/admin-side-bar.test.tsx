import '@testing-library/jest-dom';

import { EMPTY_FORM_STATE } from '@/lib/to-form-state';
import { render, screen } from '@testing-library/react';
import AdminDashboardLayout from './layout';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
}));

jest.mock("@/actions/auth", () => ({
    logout: () => null
}))

describe("Admin Side Bar", () => {
    it("renders the links", () => {
        render(<AdminDashboardLayout />)

        const homeLink = screen.getByRole("link", { name: "Accueil" })

        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute("href", "/admin")

        const doctorsLink = screen.getByRole("link", { name: "Docteurs" })

        expect(doctorsLink).toBeInTheDocument()
        expect(doctorsLink).toHaveAttribute("href", "/admin/doctors")

        const secretariesLink = screen.getByRole("link", { name: "Secrétaires" })

        expect(secretariesLink).toBeInTheDocument()
        expect(secretariesLink).toHaveAttribute("href", "/admin/secretaries")

        const usersLink = screen.getByRole("link", { name: "Utilisateurs" })

        expect(usersLink).toBeInTheDocument()
        expect(usersLink).toHaveAttribute("href", "/admin/users")

        const settingsLink = screen.getByRole("link", { name: "Parametres" })

        expect(settingsLink).toBeInTheDocument()
        expect(settingsLink).toHaveAttribute("href", "/admin/settings")
    })
})