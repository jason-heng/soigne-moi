"use client"

import { getDoctor } from "@/_data/doctors"
import EditPasswordDialog from "./EditPasswordDialog"
import { EditTimeTableDialog } from "./EditTimeTableDialog"
import { RemoveAlertDialog } from "./RemoveAlertDialog"

export default function DoctorCard({ doctor }: { doctor: NonNullable<Awaited<ReturnType<typeof getDoctor>>> }) {
    return (
        <div className='border-[1px] border-gray-300 shadow-md rounded-lg p-5'>
            <div className='flex flex-row justify-between w-full'>
                <div className='flex flex-col'>
                    <p className='font-bold text-lg text-gray-700 w-fit'>{doctor.firstName} {doctor.lastName}</p>
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
                    {/* <Button className='bg-white border-[2px] shadow-md text-gray-600 font-semibold h-7 hover:bg-gray-100 hover:text-blue-400 mt-auto mx-auto w-36 hover:border-none' onClick={toggleTimeTable}>Emploi du temps</Button>
                    <EditPasswordPopup doctorId={doctor.id} />
                    <Button className=' border-[2px] shadow-md rounded-sm h-7 mx-auto w-36 bg-white hover:bg-red-500 text-red-500 hover:text-white font-semibold hover:border-none' onClick={toggleDeleteAlert}>Supprimer</Button> */}
                </div>
            </div>
        </div>

    )
}