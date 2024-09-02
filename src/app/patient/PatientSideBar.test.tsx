import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PatientDashboardLayout from './layout'

jest.mock("../../_lib/session", () => ({
    logout: () => null
}))

describe("Nav Bar", () => {
    it("renders the nav", () => {
        const res = render(<PatientDashboardLayout />)

        const nav = res.container.querySelector("nav")

        expect(nav).toBeInTheDocument()
    })
})