import { FullConversationType } from '@/types'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

const useOtherUser = (
   conversation: FullConversationType | { users: Array<User> }
) => {
   const session = useSession()

   const otherUser = useMemo(() => {
      const currentUserEmail = session?.data?.user?.email

      const otherUser = conversation.users.filter(
         (user) => user.email !== currentUserEmail
      )

      return otherUser[0]
   }, [conversation.users, session?.data?.user?.email])

   return otherUser
}

export default useOtherUser
