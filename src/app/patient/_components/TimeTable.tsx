import { getDoctor } from "@/_data/doctors"
import { Label } from "@radix-ui/react-label"
import { Button } from '@/_components/ui/button'
import { useState } from "react"
import { setTimeTable } from "@/app/admin/doctors/actions"
import toast from "react-hot-toast"

export function TimeTable({ setShowTimeTable, doctor }: { setShowTimeTable: Function, doctor: NonNullable<Awaited<ReturnType<typeof getDoctor>>> }) {

    const [changed, setChanged] = useState(false)
    const [worksSunday, setWorksSunday] = useState(doctor.worksSunday)
    const [worksMonday, setWorksMonday] = useState(doctor.worksMonday)
    const [worksTuesday, setWorksTuesday] = useState(doctor.worksTuesday)
    const [worksWednesday, setWorksWednesday] = useState(doctor.worksWednesday)
    const [worksThursday, setWorksThursday] = useState(doctor.worksThursday)
    const [worksFriday, setWorksFriday] = useState(doctor.worksFriday)
    const [worksSaturday, setWorksSaturday] = useState(doctor.worksSaturday)


    const handleSave = () => {
        setTimeTable(doctor.id, worksSunday, worksMonday, worksTuesday, worksWednesday, worksThursday, worksFriday, worksSaturday)
        setShowTimeTable(false)
        toast.success("Emploi du temps modifié")

    }

    return (
        <div>
            <div className='bg-black absolute bottom-0 top-0 right-0 left-0 opacity-50 z-10' onClick={(e) => { setShowTimeTable(false) }}></div>
            <div className="bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 opacity-100 rounded-lg p-8 flex flex-col gap-4">
                <h1 className='font-bold text-xl text-primary'>Emploi du temps de Dr.{doctor.firstName}</h1>
                <div>
                    <p className="mt-1 text-lg font-semibold text-gray-700">Jours de travail:</p>

                    <Label className="flex gap-3">
                        <input type="checkbox" className="" onClick={(e) => {
                            setChanged(true)
                            setWorksSunday(!worksSunday)
                        }} checked={worksSunday} />
                        Dimanche
                    </Label>

                    <Label className="flex gap-3">
                        <input type="checkbox" className="" onClick={(e) => {
                            setChanged(true)
                            setWorksMonday(!worksMonday)
                        }} checked={worksMonday} />
                        Lundi
                    </Label>

                    <Label className="flex gap-3">
                        <input type="checkbox" className="" onClick={(e) => {
                            setChanged(true)
                            setWorksTuesday(!worksTuesday)
                        }} checked={worksTuesday} />
                        Mardi
                    </Label>

                    <Label className="flex gap-3">
                        <input type="checkbox" className="" onClick={(e) => {
                            setChanged(true)
                            setWorksWednesday(!worksWednesday)
                        }} checked={worksWednesday} />
                        Mercredi
                    </Label>

                    <Label className="flex gap-3">
                        <input type="checkbox" className="" onClick={(e) => {
                            setChanged(true)
                            setWorksThursday(!worksThursday)
                        }} checked={worksThursday} />
                        Jeudi
                    </Label>

                    <Label className="flex gap-3">
                        <input type="checkbox" className="" onClick={(e) => {
                            setChanged(true)
                            setWorksFriday(!worksFriday)
                        }} checked={worksFriday} />
                        Vendredi
                    </Label>

                    <Label className="flex gap-3">
                        <input type="checkbox" className="" onClick={(e) => {
                            setChanged(true)
                            setWorksSaturday(!worksSaturday)
                        }} checked={worksSaturday} />
                        Samedi
                    </Label>
                </div>
                <div className="flex gap-6 mx-auto">
                    <Button className='text-red-600 bg-white border hover:bg-gray-100' onClick={() => setShowTimeTable(false)}>Annuler</Button>
                    <Button 
                    disabled={!changed} 
                    onClick={handleSave}>Confirmer
                    </Button>
                </div>


            </div>
        </div>
    )
}