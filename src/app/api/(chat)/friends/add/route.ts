import { getUserId } from '@/actions/getUserId'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchRedis } from '@/helpers/redis'
import { db } from '@/utils/chatDB'
import { prisma } from '@/utils/prisma'
import { pusherServer } from '@/utils/pusher'
import { toPusherKey } from '@/utils/utils'
import { addFriendValidator } from '@/utils/validations/add-friend'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email: emailToAdd } = addFriendValidator.parse(body.email)
    const userIdToAdd = await prisma.user.findUnique({
      where: {
        email: emailToAdd
      }
    })

    if (!userIdToAdd) {
      return new Response('This person does not exist.', { status: 400 })
    }

    const personFound = (await fetchRedis(
      'get',
      `user:${userIdToAdd.id}`
    )) as string
    
    const redisResponse = JSON.parse(personFound)

    const idToAdd = redisResponse.id
    
    console.log(idToAdd)

    if (!idToAdd) {
      return new Response('This person does not exist.', { status: 400 })
    }

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (idToAdd === session.user.id) {
      return new Response('You cannot add yourself as a friend', {
        status: 400,
      })
    }

    // check if user is already added
    const isAlreadyAdded = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1

    if (isAlreadyAdded) {
      return new Response('Already added this user', { status: 400 })
    }

    // check if user is already added
    const isAlreadyFriends = (await fetchRedis(
      'sismember',
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1

    if (isAlreadyFriends) {
      return new Response('Already friends with this user', { status: 400 })
    }

    // valid request, send friend request

    await pusherServer.trigger(
      toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
      'incoming_friend_requests',
      {
        senderId: session.user.id,
        senderEmail: session.user.email,
      }
    )

    await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 })
    }

    return new Response('Invalid request', { status: 400 })
  }
}