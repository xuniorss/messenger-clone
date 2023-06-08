import getCurrentUser from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export const POST = async (request: Request) => {
   try {
      const currentUser = await getCurrentUser()
      const body = await request.json()
      const { name, image } = body

      if (!currentUser?.id)
         return new NextResponse('Unauthorized', { status: 401 })

      const updatedUser = await prisma.user.update({
         where: { id: currentUser.id },
         data: { image, name },
      })

      return NextResponse.json(updatedUser)
   } catch (error) {
      console.error(error)
      return new NextResponse('Internal Error', { status: 500 })
   }
}
