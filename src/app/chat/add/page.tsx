import { FC } from 'react'
import AddFriendButton from '../components/AddFriendButton'

const page: FC = () => {
  return (
    <main className='pl-40'>
      <h1 className='font-bold text-black pb-4 text-5xl '>Add a friend</h1>
      <div className='top-10'>
        <AddFriendButton />
      </div>
    </main>
  )
}

export default page