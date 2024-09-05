import { getMyStays } from '@/_data/stays';
import { formatDate } from '@/_lib/utils';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { StaysCard } from './StaysCard';

jest.mock('../../../../_data/stays', () => ({
    getMyStays: () => []
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
    {
        patientId: 1,
        id: 2,
        doctorId: 1,
        doctor: {
            id: 2,
            firstName: "Julien",
            lastName: "Turpin",
            password: "feoefo,ef,ef",
            registrationNumber: 1000234,
            speciality: "Cardiologue",
            worksFriday: false,
            worksMonday: true,
            worksTuesday: true,
            worksWednesday: true,
            worksThursday: true,
            worksSaturday: false,
            worksSunday: false,
        },
        start: new Date("2022-01-12"),
        end: new Date("2022-01-15"),
        reason: 'Reason 2',
        prescriptionId: 1,
        prescription: {
            stayId: 1,
            id: 1,
            start: new Date("2022-01-12"),
            end: new Date("2022-01-15"),
            drugs: [
                { id: 1, name: 'Drug 1', dosage: 'Dosage 1', prescriptionId: 1 },
                { id: 2, name: 'Drug 2', dosage: 'Dosage 2', prescriptionId: 1 },
            ],
        },
    },
];

describe('Stays Card', () => {
    it('renders the stays card with no stays', async () => {
        render(<StaysCard stays={[]} selected={undefined} setSelected={jest.fn()} />);

        expect(screen.getByText('Vos séjours')).toBeInTheDocument();
        expect(screen.getAllByText('Aucun séjour').length).toBe(2);
        expect(screen.getByPlaceholderText('Rechercher...')).toBeInTheDocument();
    });

    it('renders the stays card with 1 stay', async () => {
        render(<StaysCard stays={[mockStays[0]]} selected={undefined} setSelected={jest.fn()} />);

        expect(screen.getByText('Vos séjours')).toBeInTheDocument();
        expect(screen.getByText('1 séjour')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Rechercher...')).toBeInTheDocument();
    });

    it('renders the stays card with multiple stays', async () => {
        render(<StaysCard stays={mockStays} selected={undefined} setSelected={jest.fn()} />);

        expect(screen.getByText('Vos séjours')).toBeInTheDocument();
        expect(screen.getByText('2 séjours')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Rechercher...')).toBeInTheDocument();
    });

    it('displays stays cards', async () => {
        render(<StaysCard stays={mockStays} selected={undefined} setSelected={jest.fn()} />);

        mockStays.forEach(mockStay => {
            expect(screen.getByRole("heading", { level: 3, name: mockStay.reason }))
            expect(screen.getByText(`${formatDate(mockStay.start)} - ${formatDate(mockStay.end)}`)).toBeInTheDocument();

            expect(screen.getByText((_, element) => {
                const hasText = (node: typeof element) => node?.textContent === `Docteur: ${mockStay.doctor.firstName} ${mockStay.doctor.lastName}`;
                const elementHasText = hasText(element);
                const childrenDontHaveText = Array.from(element?.children || []).every(child => !hasText(child));
                return elementHasText && childrenDontHaveText;
            })).toBeInTheDocument();

            expect(screen.getByText((_, element) => {
                const hasText = (node: typeof element) => node?.textContent === `Spécialité: ${mockStay.doctor.speciality}`;
                const elementHasText = hasText(element);
                const childrenDontHaveText = Array.from(element?.children || []).every(child => !hasText(child));
                return elementHasText && childrenDontHaveText;
            })).toBeInTheDocument();
        })
    });

    it('filters stays based on search input', async () => {
        render(<StaysCard stays={mockStays} selected={undefined} setSelected={jest.fn()} />);

        fireEvent.change(screen.getByPlaceholderText('Rechercher...'), { target: { value: 'Reason 1' } });

        expect(screen.getByRole("heading", { level: 3, name: 'Reason 1' })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { level: 3, name: 'Reason 2' })).toBeNull();
    });

    it('displays no stays message when search does not match', async () => {
        render(<StaysCard stays={mockStays} selected={undefined} setSelected={jest.fn()} />);

        fireEvent.change(screen.getByPlaceholderText('Rechercher...'), { target: { value: 'Non-existent reason' } });

        expect(screen.getByText('Aucun séjour')).toBeInTheDocument();
    });
});
