import '@testing-library/jest-dom';
import NavBarLink from "./NavBarLink"
import { render, screen } from "@testing-library/react"

describe("Nav Bar Link", () => {
    it("renders the link", () => {
        render(<NavBarLink href='/test'>Test link</NavBarLink>)

        const link = screen.getByRole("link", { name: "Test link" })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/test")
    })
})