import '@testing-library/jest-dom';
import UserSettings from "./UserSettings"
import { render, screen } from "@testing-library/react"

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [() => { }, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("../../_data/users", () => ({
    getUser: () => null
}))

describe("User Settings", () => {
    it("renders the heading", async () => {
        render(await UserSettings())

        const heading = screen.getByRole("heading", { level: 1, name: "Vos paramètres" })

        expect(heading).toBeInTheDocument()
    })
})