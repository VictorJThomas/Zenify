import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchRedis } from '@/helpers/redis'
import { messageArrayValidator } from '@/utils/validations/message'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Messages from '../components/Messages'
import ChatInput from '../components/ChatInput'
import imageDefaultUser from "~/assets/imageDefaultUser.svg"

export async function generateMetadata({
    params,
  }: {
    params: { chatId: string }
  }) {
    const session = await getServerSession(authOptions)
    if (!session) notFound()
    const [userId1, userId2] = params.chatId.split('--')
    const { user } = session
  
    const chatPartnerId = user.id === userId1 ? userId2 : userId1
    const chatPartnerRaw = (await fetchRedis(
      'get',
      `user:${chatPartnerId}`
    )) as string
    const chatPartner = JSON.parse(chatPartnerRaw) as User
  
    return { title: `Zenify | ${chatPartner.name} chat` }
  }
  
  interface PageProps {
    params: {
      chatId: string
    }
  }
  
  async function getChatMessages(chatId: string) {
    try {
      const results: string[] = await fetchRedis(
        'zrange',
        `chat:${chatId}:messages`,
        0,
        -1
      )
  
      const dbMessages = results.map((message) => JSON.parse(message) as Message)
  
      const reversedDbMessages = dbMessages.reverse()
  
      const messages = messageArrayValidator.parse(reversedDbMessages)
  
      return messages
    } catch (error) {
      notFound()
    }
  }
  
  const page = async ({ params }: PageProps) => {
    const { chatId } = params
    const session = await getServerSession(authOptions)
    if (!session) notFound()
  
    const { user } = session
  
    const [userId1, userId2] = chatId.split('--')
  
    if (user.id !== userId1 && user.id !== userId2) {
      notFound()
    }
  
    const chatPartnerId = user.id === userId1 ? userId2 : userId1
  
    const chatPartnerRaw = (await fetchRedis(
      'get',
      `user:${chatPartnerId}`
    )) as string

    
    const chatPartner = JSON.parse(chatPartnerRaw) as User
    const initialMessages = await getChatMessages(chatId)
  
    return (
      <div className='flex-1 justify-between pr-20 flex flex-col'>
        <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
          <div className='relative flex items-center space-x-4'>
            <div className='relative'>
              <div className='relative w-8 sm:w-12 h-8 sm:h-12'>
                <Image
                  fill
                  referrerPolicy='no-referrer'
                  src={chatPartner.picture || imageDefaultUser}
                  alt={`${chatPartner.name} profile picture`}
                  className='rounded-full'
                />
              </div>
            </div>
  
            <div className='flex flex-col leading-tight'>
              <div className='text-xl flex items-center'>
                <span className='text-gray-700 mr-3  font-semibold'>
                  {chatPartner.name}
                </span>
              </div>
  
              <span className='text-sm text-gray-600'>{chatPartner.email}</span>
            </div>
          </div>
        </div>
        <div className='overflow-y-hidden bg-scroll h-[47rem]'>
          <Messages
            chatId={chatId}
            chatPartner={chatPartner}
            sessionImg={session.user.image}
            sessionId={session.user.id}
            initialMessages={initialMessages}
          />
        </div>
        <div className='h-18'>
          <ChatInput chatId={chatId} chatPartner={chatPartner} />
        </div>
      </div>
    )
  }
  
  export default page