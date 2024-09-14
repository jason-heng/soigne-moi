import { findOverbookedDates } from "./data"

jest.mock("../../_lib/session", () => ({
    verifySession: () => { }
}))

describe('Find Overbooked Dates', () => {
    it('finds no overbooked dates', () => {
        const mockStays: Parameters<typeof findOverbookedDates>[0] = [
            {
                start: new Date(2024, 12, 1),
                end: new Date(2024, 12, 4),
            },
            {
                start: new Date(2024, 11, 4),
                end: new Date(2024, 11, 6),
            },
            {
                start: new Date(2024, 11, 2),
                end: new Date(2024, 11, 5),
            },
            {
                start: new Date(2024, 11, 11),
                end: new Date(2024, 11, 14),
            },
            {
                start: new Date(2024, 11, 1),
                end: new Date(2024, 11, 4),
            }
        ]

        const overbookedDates = findOverbookedDates(mockStays)

        expect(overbookedDates).toEqual([])
    })

    it('finds 3 overbooked dates', () => {
        const mockStays: Parameters<typeof findOverbookedDates>[0] = [
            {
                start: new Date(2024, 11, 2),
                end: new Date(2024, 11, 4),
            },
            {
                start: new Date(2024, 11, 2),
                end: new Date(2024, 11, 4),
            },
            {
                start: new Date(2024, 11, 2),
                end: new Date(2024, 11, 4),
            },
            {
                start: new Date(2024, 11, 2),
                end: new Date(2024, 11, 4),
            },
            {
                start: new Date(2024, 11, 2),
                end: new Date(2024, 11, 4),
            }
        ]

        const overbookedDates = findOverbookedDates(mockStays)

        expect(overbookedDates).toEqual([
            new Date("2024-12-01T23:00:00.000Z"),
            new Date("2024-12-02T23:00:00.000Z"),
            new Date("2024-12-03T23:00:00.000Z"),
        ])
    })
})