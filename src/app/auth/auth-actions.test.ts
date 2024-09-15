import { EMPTY_FORM_STATE } from "@/_lib/to-form-state"
import { Prisma } from "@prisma/client"
import { login, signup } from "./actions"

const mockUsers = [
    {
        email: "test@gmail.com",
        password: "test123",
        admin: false
    },
    {
        email: "admin@gmail.com",
        password: "admin123",
        admin: true
    }
]

jest.mock("bcrypt", () => ({
    compare: (password: string, hashedPassword: string) => password === hashedPassword,
    hash: () => null
}))

jest.mock("../../_lib/db", () => ({
    user: {
        findUnique: (args: Prisma.UserFindUniqueArgs) => mockUsers.find(user => user.email === args.where.email),
        create: () => ({id : 1, firstName: "John"})
    }
}))

jest.mock("../../_lib/session", () => ({
    createSession: jest.fn()
}))

describe("Login", () => {
    it("returns invalid email", async () => {
        const mockFormData = new FormData()
        mockFormData.append('email', "john.doe")
        mockFormData.append('password', 'test123')

        const state = await login(EMPTY_FORM_STATE, mockFormData)

        expect(state.fieldErrors).toEqual({
            email: ["Email invalide."]
        })
    })

    it("returns required password", async () => {
        const mockFormData = new FormData()
        mockFormData.append('email', "john.doe@gmail.com")
        mockFormData.append('password', '')

        const state = await login(EMPTY_FORM_STATE, mockFormData)

        expect(state.fieldErrors).toEqual({
            password: ["Mot de passe requis."]
        })
    })

    it("returns user not found", async () => {
        const mockFormData = new FormData()
        mockFormData.append('email', "john.doe@gmail.com")
        mockFormData.append('password', 'test123')

        const state = await login(EMPTY_FORM_STATE, mockFormData)

        expect(state.fieldErrors).toEqual({
            email: ["Utilisateur introuvable !"]
        })
    })

    it("returns incorrect password", async () => {
        const mockFormData = new FormData()
        mockFormData.append('email', "test@gmail.com")
        mockFormData.append('password', 'wrong password')

        const state = await login(EMPTY_FORM_STATE, mockFormData)

        expect(state.fieldErrors).toEqual({
            password: ["Mot de passe incorrect !"]
        })
    })

    it("logs in as patient", async () => {
        const mockFormData = new FormData()
        mockFormData.append('email', "test@gmail.com")
        mockFormData.append('password', 'test123')

        const state = await login(EMPTY_FORM_STATE, mockFormData)

        expect(state.message).toBe("Connecté !")
        expect(state.redirect).toBe("/patient")
    })

    it("logs in as admin", async () => {
        const mockFormData = new FormData()
        mockFormData.append('email', "admin@gmail.com")
        mockFormData.append('password', 'admin123')

        const state = await login(EMPTY_FORM_STATE, mockFormData)

        expect(state.message).toBe("Connecté !")
        expect(state.redirect).toBe("/admin")
    })
})

describe("Signup", () => {
    it("returns invalid firstName", async () => {
        const mockFormData = new FormData()
        mockFormData.append('first-name', "") // prénom entré est invalide
        mockFormData.append('last-name', "john")
        mockFormData.append('email', "john.doe@gmail.com")
        mockFormData.append('address', "21 rue paris")
        mockFormData.append('password', 'test123')
        mockFormData.append('repeat-password', 'test123')

        const state = await signup(EMPTY_FORM_STATE, mockFormData)

        expect(state.fieldErrors).toEqual({
            firstName: ["Prénom requis."]
        })
    })

    it("returns invalid email", async () => {
        const mockFormData = new FormData()
        mockFormData.append('first-name', "hamid")
        mockFormData.append('last-name', "john")
        mockFormData.append('email', "john.doe") // email est invalide
        mockFormData.append('address', "21 rue paris")
        mockFormData.append('password', 'test123')
        mockFormData.append('repeat-password', 'test123')

        const state = await signup(EMPTY_FORM_STATE, mockFormData)

        expect(state.fieldErrors).toEqual({
            email: ["Email requis."]
        })
    })

    it("returns invalid password", async () => {
        // tout est valide sauf le mot de passe
        const mockFormData = new FormData()
        mockFormData.append('first-name', "john")
        mockFormData.append('last-name', "john")
        mockFormData.append('email', "john.doe@gmail.com")
        mockFormData.append('address', "21 rue paris")
        mockFormData.append('password', '')
        mockFormData.append('repeat-password', 'test123')

        const state = await signup(EMPTY_FORM_STATE, mockFormData)

        expect(state.fieldErrors).toEqual({
            password: ["Mot de passe requis."]
        })
    })

    it("returns passwords don't match", async () => {
        // tout est valide mais les deux mot de passe ne sont pas identiques
        const mockFormData = new FormData()
        mockFormData.append('first-name', "john")
        mockFormData.append('last-name', "john")
        mockFormData.append('email', "john.doe@gmail.com")
        mockFormData.append('address', "21 rue paris")
        mockFormData.append('password', 'test123')
        mockFormData.append('repeat-password', 'test321')

        const state = await signup(EMPTY_FORM_STATE, mockFormData)

        expect(state.fieldErrors).toEqual({
            repeatPassword: ["Mot de passes differents !"]
        })
    })

    it("signs up", async () => {
        const mockFormData = new FormData()
        mockFormData.append('first-name', "john")
        mockFormData.append('last-name', "john")
        mockFormData.append('email', "john.doe@gmail.com")
        mockFormData.append('address', "21 rue paris")
        mockFormData.append('password', 'test123')
        mockFormData.append('repeat-password', 'test123')

        const state = await signup(EMPTY_FORM_STATE, mockFormData)

        expect(state.message).toBe("Compte crée !")
        expect(state.redirect).toBe("/patient")
    })
})