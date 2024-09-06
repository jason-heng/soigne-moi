"use client"

import { getDoctor } from "@/_data/doctors"
import EditPasswordDialog from "./EditPasswordDialog"
import { EditTimeTableDialog } from "./EditTimeTableDialog"
import { RemoveAlertDialog } from "./RemoveAlertDialog"

export default function DoctorCard({ doctor }: { doctor: NonNullable<Awaited<ReturnType<typeof getDoctor>>> }) {
    return (
        <div className='border-[1px] border-gray-300 shadow-md rounded-lg p-5'>
            <div className='flex flex-col lg:flex-row gap-8 justify-between w-full'>
                <div className='flex flex-col'>
                    <h4 className='font-bold text-lg text-gray-700 w-fit'>{doctor.firstName} {doctor.lastName}</h4>
                    <div className='mt-1'>
                        <p>
                            <span className='font-semibold rounded-sm text-gray-700'>Spécialité:</span>
                            <span className='text-gray-700 text-sm font-medium mt-[2px] ml-2 text-muted-foreground'>{doctor.speciality}</span>
                        </p>

                        <p>
                            <span className='font-semibold rounded-sm text-gray-700'>Matricule:</span>
                            <span className='text-gray-700 text-sm font-medium mt-[2px] ml-2 text-muted-foreground'>{doctor.registrationNumber}</span>
                        </p>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <EditTimeTableDialog doctor={doctor} />
                    <EditPasswordDialog doctorId={doctor.id} />
                    <RemoveAlertDialog doctorId={doctor.id} />
                </div>
            </div>
        </div>
    )
}