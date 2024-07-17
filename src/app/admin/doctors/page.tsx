import React from 'react'
import { AddDoctorForm, DoctorsListCard } from './components'
import { getDoctors } from '@/_data/doctors'


export default async function page() {
  const doctors = await getDoctors()
  return (
    <div className='flex-1 h-screen pt-10'>
      <div className='flex mx-auto h-[640px] px-24 justify-center gap-8'>
        <DoctorsListCard doctors={doctors}/>
        <AddDoctorForm/>
      </div>
    </div>
  )
}
