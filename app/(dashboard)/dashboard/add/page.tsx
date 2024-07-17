
import { AddFriend } from '@/components/addFriendForm'
import { FC } from 'react'

const page: FC = () => {
  return (
    <main className='pt-8'>
      <h1 className='font-bold text-5xl mb-8'>Add a friend</h1>
      <AddFriend />
    </main>
  )
}

export default page