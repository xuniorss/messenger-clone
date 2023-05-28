import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
   try {
      const currentUser = await getCurrentUser()
      const body = await request.json()

      const { userId, isGroup, members, name } = body

      if (!currentUser?.id || !currentUser?.email)
         return new NextResponse('Unauthorized', { status: 401 })

      if (isGroup && (!members || members.length < 2 || !name))
         return new NextResponse('Invalid data', { status: 400 })

      if (isGroup) {
         const newConversation = await prisma.conversation.create({
            data: {
               name,
               isGroup,
               users: {
                  connect: [
                     ...members.map((member: { value: string }) => ({
                        id: member.value,
                     })),
                     { id: currentUser.id },
                  ],
               },
            },
            include: { users: true },
         })

         return NextResponse.json(newConversation)
      }

      const existingConversations = await prisma.conversation.findMany({
         where: {
            OR: [
               { userIds: { equals: [currentUser.id, userId] } },
               { userIds: { equals: [userId, currentUser.id] } },
            ],
         },
      })

      const singleConversations = existingConversations[0]

      if (singleConversations) return NextResponse.json(singleConversations)

      const newConversation = await prisma.conversation.create({
         data: { users: { connect: [{ id: currentUser.id }, { id: userId }] } },
         include: { users: true },
      })

      return NextResponse.json(newConversation)
   } catch (error) {
      return new NextResponse('Internal Error', { status: 500 })
   }
}
