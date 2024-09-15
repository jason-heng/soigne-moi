import '@testing-library/jest-dom';

import { EMPTY_FORM_STATE } from '@/lib/to-form-state';
import { render, screen } from '@testing-library/react';
import AdminDoctorsPage from './page';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("@/data/doctors", () => ({
    getDoctors: () => []
}))

jest.mock("./actions", () => ({
    addDoctor: () => null,
    editTimeTable: () => null,
    editDoctorPassword: () => null,
    removeDoctor: () => null,
}))

describe("Admin Doctors Page", () => {
    it("renders the heading", async () => {
        render(await AdminDoctorsPage())

        const heading = screen.getByRole("heading", { level: 1, name: "Géstion des docteurs" })

        expect(heading).toBeInTheDocument()
    })
})