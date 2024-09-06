import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import UserSettings from ".";

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [() => { }, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("../../_data/users", () => ({
    getUser: () => ({})
}))

describe("User Settings", () => {
    it("renders the heading", async () => {
        render(await UserSettings())

        const heading = screen.getByRole("heading", { level: 1, name: "Vos paramètres" })

        expect(heading).toBeInTheDocument()
    })
})