import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SelectedPrescriptionCard } from './SelectedPrescriptionCard';
import { formatDate } from '@/_lib/utils';

jest.mock('../../../../_data/stays', () => ({
    getMyStays: () => []
}));

const mockStay = {
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
}

describe('Selected Prescription Card', () => {
    it('renders the selected prescription card with no stay', async () => {
        render(<SelectedPrescriptionCard stay={undefined} />);

        expect(screen.getByText('Aucun séjour séléctionné')).toBeInTheDocument();
    });

    it('renders the selected prescription card with no prescription', async () => {
        render(<SelectedPrescriptionCard stay={{ ...mockStay, prescription: null }} />);

        expect(screen.getByText('Aucune préscription')).toBeInTheDocument();
    });

    it('renders the selected prescription card with no drugs', async () => {
        render(<SelectedPrescriptionCard stay={{ ...mockStay, prescription: { ...mockStay.prescription, drugs: [] } }} />);

        expect(screen.getAllByText('Aucun médicament').length).toBe(2);
    });

    it('renders the selected prescription card with drugs', async () => {
        render(<SelectedPrescriptionCard stay={mockStay} />);

        expect(screen.getByRole("heading", { level: 3, name: 'Préscription selectionnée' })).toBeInTheDocument();
        expect(screen.getByText(`${formatDate(mockStay.prescription.start)} - ${formatDate(mockStay.prescription.end)}`)).toBeInTheDocument();
        expect(screen.getByText(`${mockStay.prescription.drugs.length || "Aucun"} médicament${mockStay.prescription.drugs.length > 1 ? 's' : ''}`)).toBeInTheDocument();

        mockStay.prescription.drugs.forEach(drug => {
            expect(screen.getByText(drug.name)).toBeInTheDocument();
            expect(screen.getByText(drug.dosage)).toBeInTheDocument();
        });
    });

    it('filters drugs based on search input', async () => {
        render(<SelectedPrescriptionCard stay={mockStay} />);

        fireEvent.change(screen.getByPlaceholderText('Rechercher...'), { target: { value: 'Drug 1' } });

        expect(screen.getByText('Drug 1')).toBeInTheDocument();
        expect(screen.queryByText('Drug 2')).toBeNull();
    });

    it('displays no drugs message when search does not match', async () => {
        render(<SelectedPrescriptionCard stay={mockStay} />);

        fireEvent.change(screen.getByPlaceholderText('Rechercher...'), { target: { value: 'Non-existent drug' } });

        expect(screen.getByText('Aucun médicament')).toBeInTheDocument();
    });
});
