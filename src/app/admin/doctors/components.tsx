"use client"

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { getDoctors } from '@/lib/doctors';
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { doctorAdd } from './actions';


function DoctorCard({ firstName, lastName, speciality, registrationNumber } : { firstName:string, lastName:string, speciality:string, registrationNumber:number }) {
  return (
    <div className='border-[1px] border-gray-300 shadow-md rounded-lg p-4 px-6 hover:bg-gray-50'>
      <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-col'>
            <p className='font-bold text-lg text-gray-700 w-fit'>{firstName} {lastName}</p>
            <div className='mt-1'>
              <p>
                  <span className='font-semibold rounded-sm text-gray-700'>Spécialité:</span>
                  <span className='text-gray-700 text-sm font-medium mt-[2px] ml-2 text-muted-foreground'>{speciality}</span>
              </p>
              
              <p>
                <span className='font-semibold rounded-sm text-gray-700'>Matricule:</span>
                <span className='text-gray-700 text-sm font-medium mt-[2px] ml-2 text-muted-foreground'>{registrationNumber}</span>
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <Button className='bg-white border-[2px] shadow-md text-gray-600 font-semibold h-7 hover:bg-gray-100 hover:text-blue-400 mt-auto mx-auto w-36'>Emploi du temps</Button>
            <Button className='bg-white rounded-sm h-7 mx-auto w-36 text-xs hover:bg-blue-500 text-gray-600 hover:text-white border-[2px] shadow-md'>Changer mot de passe</Button>
            <Button className=' border-[2px] shadow-md rounded-sm h-7 mx-auto w-36 bg-white hover:bg-red-500 text-gray-600 hover:text-white'>Supprimer</Button>
          </div>

      </div>
    </div>
  )
}

export function DoctorsListCard({doctors} : {doctors : Awaited<ReturnType<typeof getDoctors>>}) {

  return (
    <Card className='w-3/5 shadow-2xl px-6 border-gray-300 rounded-xl border-[1px] overflow-y-scroll'>
      <CardHeader className='pb-2 px-1'>
        <CardTitle className='text-xl text-primary'>Liste des médecins</CardTitle>
        <CardDescription className="relative">
          <MagnifyingGlassIcon className="absolute top-[50%] translate-y-[-50%] right-2" />
          <Input placeholder="Rechercher..." className='w-full'/>
        </CardDescription>
      </CardHeader>
      <div className='mt-4 flex gap-3 flex-col'>
        {doctors.map(doctor => (
          <DoctorCard key={doctor.id} firstName={doctor.firstName} lastName={doctor.lastName} speciality={doctor.speciality} registrationNumber={doctor.registrationNumber}/>
        ))}
      </div>
        
    </Card>
  )
}

export function AddDoctorForm() {
    const [firstNameError, setFirstNameError] = useState<string | null>(null)
    const [lastNameError, setLastNameError] = useState<string | null>(null)
    const [specialityError, setSpecialityError] = useState<string | null>(null)
    const [registrationNumberError, setRegistrationNumberError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(formData: FormData) {
        setFirstNameError(null);
        setLastNameError(null);
        setSpecialityError(null);
        setRegistrationNumberError(null);
        setPasswordError(null);

        const signupSchema = z.object({
            firstName: z.string().min(1, "Prénom invalide !"),
            lastName: z.string().min(1, "Nom invalide !"),
            speciality: z.string().min(1, "Spécialité invalide !"),
            registrationNumber: z.coerce.number().min(1, "Matricule invalide !"),
            password: z.string().min(1, "Mot de passe invalide !"),
        });

        const result = signupSchema.safeParse({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            speciality: formData.get('speciality'),
            registrationNumber: formData.get('registrationNumber'),
            password: formData.get('password'),
        });

        if (!result.success) {
            setFirstNameError(result.error.flatten().fieldErrors.firstName?.[0] ?? null);
            setLastNameError(result.error.flatten().fieldErrors.lastName?.[0] ?? null);
            setSpecialityError(result.error.flatten().fieldErrors.speciality?.[0] ?? null);
            setRegistrationNumberError(result.error.flatten().fieldErrors.registrationNumber?.[0] ?? null);
            setPasswordError(result.error.flatten().fieldErrors.password?.[0] ?? null);
            return
        }


        try {
            await doctorAdd(result.data.firstName, result.data.lastName, result.data.speciality, result.data.registrationNumber, result.data.password)
            formRef.current?.reset()
            toast.success("Docteur ajouté !")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }
  
  return (
    <Card className='w-2/5 shadow-2xl px-6 border-gray-300 rounded-xl border-[1px] h-'>
      <CardHeader className='pb-2 px-1'>
        <CardTitle className='text-xl text-primary mb-4'>Ajouter un médecin</CardTitle>

        <form className='px-0 flex-col flex gap-4' action={handleSubmit} ref={formRef}>
          <div className='w-full'>
            <Label>Nom:</Label>
            <Input placeholder='Entrez le nom du médecin...' name='lastName'/>
            {lastNameError && <p className='text-sm text-destructive'>{lastNameError}</p>}
          </div>
          
          <div className='w-full'>
            <Label>Prénom:</Label>
            <Input placeholder='Entrez le prénom du médecin...' name='firstName'/>
            {firstNameError && <p className='text-sm text-destructive'>{firstNameError}</p>}

          </div>

          <div className='w-full'>
            <Label>Spécialité:</Label>
            <Input placeholder='Entrez la spécialité du médecin...' name='speciality'/>
            {specialityError && <p className='text-sm text-destructive'>{specialityError}</p>}
          </div>

          <div className='w-full'>
            <Label className='mb-10'>Matricule:</Label>
            <Input placeholder='Entrez le matricule du médecin...' name='registrationNumber' type='number'/>
            {registrationNumberError && <p className='text-sm text-destructive'>{registrationNumberError}</p>}
          </div>

          <div className='w-full'>
            <Label>Mot de passe:</Label>
            <Input placeholder='Entrez un mot de passe...' name='password' type='password'/>
            {passwordError && <p className='text-sm text-destructive'>{passwordError}</p>}
          </div>
          <Button className='mt-16 px-20 w-fit mx-auto text-md'>Ajouter</Button>
        </form>

      </CardHeader>
    </Card>
  )
}