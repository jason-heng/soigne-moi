import React from 'react'
import { AddDoctorForm, DoctorsListCard } from './components'
import { getDoctors } from '@/_data/doctors'


export default async function page() {
  const doctors = await getDoctors()
  return (
    <div className='flex-1 p-8 h-screen'>
      <h1 className='text-xl font-semibold'>Gestion de docteurs</h1>

      <div className='flex h-[90%] gap-5 mt-5'>
        <DoctorsListCard doctors={doctors}/>
        <AddDoctorForm/>
      </div>
    </div>
  )
}
