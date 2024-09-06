"use client"

import { Card, CardDescription, CardHeader, CardTitle } from '@/_components/ui/card';
import { Input } from "@/_components/ui/input";
import { getDoctors } from '@/_data/doctors';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from 'react';
import DoctorCard from './DoctorCard';


export default function DoctorsList({ doctors }: { doctors: Awaited<ReturnType<typeof getDoctors>> }) {
  const [search, setSearch] = useState("")

  const visibleDoctors = doctors.filter(doctor => `${doctor.firstName.toLowerCase()} ${doctor.firstName.toLowerCase()}`.includes(search.toLowerCase()) || doctor.speciality.toLowerCase().includes(search.toLowerCase()) || doctor.registrationNumber.toString().includes(search.toLowerCase()))

  return (
    <Card className='flex-1 shadow-2xl px-6 border-gray-300 rounded-xl overflow-y-auto '>
      <CardHeader className='pb-2 px-1'>
        <CardTitle className='text-xl text-primary'>Liste des docteurs</CardTitle>
        <CardDescription className="relative">
          <MagnifyingGlassIcon className="absolute top-[50%] translate-y-[-50%] right-2" />
          <Input placeholder="Rechercher..." className='w-full' onChange={e => setSearch(e.target.value)} value={search} />
        </CardDescription>
      </CardHeader>
      <div className='my-4 flex gap-3 flex-col'>
        {visibleDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </Card>
  )
}

