import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { fetchRedis } from "@/helpers/redis"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import FriendRequests from "../components/FriendRequests"

const page = async () => {
    const session = await getServerSession(authOptions)
    if (!session) notFound()
  

    const incomingSenderIds = (await fetchRedis(
      'smembers',
      `user:${session.user.id}:incoming_friend_requests`
    )) as string[]
  
    const incomingFriendRequests = await Promise.all(
      incomingSenderIds.map(async (senderId) => {
        const sender = (await fetchRedis('get', `user:${senderId}`)) as string
        const senderParsed = JSON.parse(sender) as User
        
        return {
          senderId,
          senderEmail: senderParsed.email,
        }
      })
    )
  
    return (
      <main className=''>
        <h1 className='font-bold text-black pb-4 text-5xl '>Añade a un amigo</h1>
        <div className='flex flex-col gap-4'>
          <FriendRequests
            incomingFriendRequests={incomingFriendRequests}
            sessionId={session.user.id}
          />
        </div>
      </main>
    )
  }
  
  export default page