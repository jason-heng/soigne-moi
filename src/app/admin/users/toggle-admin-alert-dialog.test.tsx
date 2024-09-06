import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ToggleAdminAlertDialog } from './toggle-admin-alert-dialog';

jest.mock("./actions", () => ({
    setAdmin: () => null
}))

describe("Admin Users Page", () => {
    it("renders the heading", async () => {
        render(<ToggleAdminAlertDialog userId={1} isAdmin open setOpen={() => null} />)

        const heading = screen.getByRole("heading", { level: 2, name: "Etes vous sure de continuer ?" })

        expect(heading).toBeInTheDocument()
    })

    it("renders the patient paragraph", () => {
        render(<ToggleAdminAlertDialog userId={1} isAdmin={false} open setOpen={() => null} />)

        const paragraph = screen.getByRole("paragraph")

        expect(paragraph).toBeInTheDocument()
        expect(paragraph).toHaveTextContent("Cet utilisateur aura tous les droits et aura acces au panel d'administrateur.")
    })

    it("renders the admin paragraph", () => {
        render(<ToggleAdminAlertDialog userId={1} isAdmin open setOpen={() => null} />)

        const paragraph = screen.getByRole("paragraph")

        expect(paragraph).toBeInTheDocument()
        expect(paragraph).toHaveTextContent("Cet utilisateur n'aura plus tous les droits et n'aura plus acces au panel d'administrateur.")
    })

    it("renders the buttons", async () => {
        render(<ToggleAdminAlertDialog userId={1} isAdmin open setOpen={() => null} />)

        const confirmButton = screen.getByRole("button", { name: "Confirmer" })

        expect(confirmButton).toBeInTheDocument()
        expect(confirmButton).not.toBeDisabled()

        const cancelButton = screen.getByRole("button", { name: "Annuler" })

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).not.toBeDisabled()
    })
})