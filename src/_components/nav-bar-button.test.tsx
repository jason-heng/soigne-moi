import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import NavBarButton from "./nav-bar-button";

describe("Nav Bar Link", () => {
    it("renders the link", () => {
        render(<NavBarButton href='/test'>Test link</NavBarButton>)

        const link = screen.getByRole("link", { name: "Test link" })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/test")
    })
})