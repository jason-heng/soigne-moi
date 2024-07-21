
import { getDoctor } from "@/_data/doctors"
import { Button } from '@/_components/ui/button'
import { deleteDoctor } from "@/app/admin/doctors/actions"
import toast from "react-hot-toast"

export function DeleteAlert({ setShowAlert, doctor }: { setShowAlert: Function, doctor: NonNullable<Awaited<ReturnType<typeof getDoctor>>> }) {
    async function handleConfirm() {
        await deleteDoctor(doctor.id)
        setShowAlert(false)

        toast.success("Docteur supprimé !")
    }

    function handleCancel() {
        setShowAlert(false)
    }

    return (
        <div>
            <div className='bg-black absolute bottom-0 top-0 right-0 left-0 opacity-50 z-10' onClick={(e) => { setShowAlert(false) }}></div>
            <div className="bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 opacity-100 rounded-lg p-8 flex flex-col">
                <h1 className='font-semibold text-lg text-primary'>Etres vous sure de vouloir supprimer Dr.{doctor.firstName} {doctor.lastName} ?</h1>
                <p>Cette action est irreversible !</p>
                <div className="flex gap-4 self-end mt-5">
                    <Button
                        className='text-gray-500 bg-white border hover:bg-gray-100'
                        onClick={handleCancel}
                    >Annuler
                    </Button>
                    <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={handleConfirm}
                    >Supprimer
                    </Button>
                </div>
            </div>
        </div>
    )
}