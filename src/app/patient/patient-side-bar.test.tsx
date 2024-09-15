import '@testing-library/jest-dom';

import { EMPTY_FORM_STATE } from '@/_lib/to-form-state';
import { render, screen } from '@testing-library/react';
import PatientDashboardLayout from './layout';

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}));

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
}));

jest.mock("../../_lib/actions", () => ({
    logout: () => null
}))

jest.mock("next/navigation", () => ({
    usePathname: () => null
}))

describe("Patient Side Bar", () => {
    it("renders the links", () => {
        render(<PatientDashboardLayout />)

        const homeLink = screen.getByRole("link", { name: "Acceuil" })

        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute("href", "/patient")

        const historyLink = screen.getByRole("link", { name: "Historique" })

        expect(historyLink).toBeInTheDocument()
        expect(historyLink).toHaveAttribute("href", "/patient/history")

        const settingsLink = screen.getByRole("link", { name: "Parametres" })

        expect(settingsLink).toBeInTheDocument()
        expect(settingsLink).toHaveAttribute("href", "/patient/settings")
    })
})