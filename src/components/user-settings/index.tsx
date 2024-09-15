import { getUser } from '@/data/users'
import EditInfoForm from './edit-info-form'
import EditPasswordForm from './edit-password-form'

export default async function UserSettings() {
    const { firstName, lastName, address, email } = await getUser()

    return (
        <div className='flex-1 p-8 overflow-y-auto'>
            <h1 className='text-xl'>Vos paramètres</h1>
            <div className='flex flex-1 flex-col gap-8'>
                <EditInfoForm {...{ firstName, lastName, address, email }} />
                <EditPasswordForm />
            </div >
        </div>
    )
}