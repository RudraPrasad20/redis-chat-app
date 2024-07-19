import { getFriendsByUserId } from '@/components/helpers/get-friends'
import { fetchRedis } from '@/components/helpers/redis'
import { authOptions } from '@/lib/auth'
import { chatHrefConstructor } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  console.log('userid', session.user.id)

  const friends = await getFriendsByUserId(session.user.id)
  console.log('friend ids', friends)

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageRaw] = (await fetchRedis(
        'zrange',
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1
      )) as string[]

      let lastMessage: Message | null = null;
      if (lastMessageRaw) {
        lastMessage = JSON.parse(lastMessageRaw) as Message
      }
      console.log('lastMessage', lastMessage)

      return {
        ...friend,
        lastMessage,
      }
    })
  )
  console.log('friends with last message', friendsWithLastMessage)

  return {
    session,
    friendsWithLastMessage,
  }
}

export default DashboardPage
