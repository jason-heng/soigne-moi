import { getMyStays } from '@/_data/stays';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { HistoryCard } from './HistoryCard';

jest.mock('../../../../_data/stays', () => ({
    getMyStays: () => mockStays
}));

const mockStays: Awaited<ReturnType<typeof getMyStays>> = [
    {
        patientId: 1,
        id: 1,
        doctorId: 1,
        doctor: {
            id: 1,
            firstName: "Julien",
            lastName: "Lehavre",
            password: "feoefo,ef,ef",
            registrationNumber: 1000234,
            speciality: "Chirurgien",
            worksFriday: false,
            worksMonday: true,
            worksTuesday: true,
            worksWednesday: true,
            worksThursday: true,
            worksSaturday: false,
            worksSunday: false,
        },
        start: new Date("2022-01-01"),
        end: new Date("2022-01-10"),
        reason: 'Reason 1',
        prescriptionId: 1,
        prescription: {
            stayId: 1,
            id: 1,
            start: new Date("2022-01-01"),
            end: new Date("2022-01-10"),
            drugs: [
                { id: 1, name: 'Drug 1', dosage: 'Dosage 1', prescriptionId: 1 },
                { id: 2, name: 'Drug 2', dosage: 'Dosage 2', prescriptionId: 1 },
            ],
        },
    },
];

describe('History Card', () => {
    it('renders the history card with stays', async () => {
        render(<HistoryCard stays={mockStays} />);

        expect(screen.getByRole("heading", { level: 1, name: "L'historique de vos séjours" })).toBeInTheDocument();
    });
});
