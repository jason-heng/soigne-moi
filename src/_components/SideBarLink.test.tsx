import '@testing-library/jest-dom';
import SideBarLink from "./SideBarLink"
import { render, screen } from "@testing-library/react"
import { faUser } from '@fortawesome/free-solid-svg-icons';

describe("Side Bar Link", () => {
    it("renders the link", () => {
        render(<SideBarLink href='/test' icon={faUser}>Test link</SideBarLink>)

        const link = screen.getByRole("link", { name: "Test link" })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/test")
    })

    it("renders the icon", () => {
        const res = render(<SideBarLink href='/test' icon={faUser}>Test link</SideBarLink>)

        const icon = res.container.querySelector("svg")

        expect(icon).toBeInTheDocument()
    })
})