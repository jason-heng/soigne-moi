import '@testing-library/jest-dom';
import { SideBarButton } from "./SideBarButton"
import { render, screen } from "@testing-library/react"
import { faUser } from '@fortawesome/free-solid-svg-icons';

describe("Side Bar Button", () => {
    it("renders the link", () => {
        render(<SideBarButton href='/test' icon={faUser}>Test link</SideBarButton>)

        const link = screen.getByRole("link", { name: "Test link" })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/test")
    })

    it("renders the icon", () => {
        const res = render(<SideBarButton href='/test' icon={faUser}>Test link</SideBarButton>)

        const icon = res.container.querySelector("svg")

        expect(icon).toBeInTheDocument()
    })
})