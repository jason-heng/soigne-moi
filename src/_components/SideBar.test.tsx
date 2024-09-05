import '@testing-library/jest-dom';
import { SideBarButton } from "./SideBarButton"
import { render, screen } from "@testing-library/react"
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { SideBar, SideBarLinks } from './SideBar';

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [() => { }, null],
}));

jest.mock("../_lib/actions", () => ({
    logout: () => null
}))

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

describe("Side Bar Links", () => {
    it("renders links", () => {
        render(<SideBarLinks links={[{href: "/test", icon: faHouse, text: "Test Link"}]} />)
        
        const testLink = screen.getByRole("link", { name: "Test Link" })

        expect(testLink).toBeInTheDocument()
        expect(testLink).toHaveAttribute("href", "/test")
    })

    it("renders the logout form", () => {
        const res = render(<SideBarLinks links={[]} />)

        const logoutForm = res.container.querySelector("form")

        expect(logoutForm).toBeInTheDocument()
    })

    it("renders the logout button", () => {
        render(<SideBarLinks links={[]} />)

        const logoutButton = screen.getByRole("button", { name: "Déconnexion" })

        expect(logoutButton).toBeInTheDocument()
        expect(logoutButton).not.toBeDisabled()
    })
})

describe("Side Bar", () => {
    it("renders the nav", () => {
        const res = render(<SideBar links={[]} />)

        const nav = res.container.querySelector("nav")

        expect(nav).toBeInTheDocument()
    })

    it("renders links", () => {
        render(<SideBar links={[{href: "/test", icon: faHouse, text: "Test Link"}]} />)
        
        const testLink = screen.getByRole("link", { name: "Test Link" })

        expect(testLink).toBeInTheDocument()
        expect(testLink).toHaveAttribute("href", "/test")
    })

    it("renders the logout form", () => {
        const res = render(<SideBar links={[]} />)

        const logoutForm = res.container.querySelector("form")

        expect(logoutForm).toBeInTheDocument()
    })

    it("renders the logout button", () => {
        render(<SideBar links={[]} />)

        const logoutButton = screen.getByRole("button", { name: "Déconnexion" })

        expect(logoutButton).toBeInTheDocument()
        expect(logoutButton).not.toBeDisabled()
    })
})