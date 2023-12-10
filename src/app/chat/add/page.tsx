import { FC } from 'react'
import AddFriendButton from '../components/AddFriendButton'

const page: FC = () => {
  return (
    <main className=''>
      <h1 className='font-bold text-black pb-4 text-5xl '>Añade a un amigo</h1>
      <div className='top-10'>
        <AddFriendButton />
      </div>
    </main>
  )
}

export default page