'use client'

import { Avatar } from '@/components/Avatar'
import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { useMemo } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'

interface HeaderProps {
   conversation: Conversation & { users: Array<User> }
}

export const Header = ({ conversation }: HeaderProps) => {
   const otherUser = useOtherUser(conversation)

   const statusText = useMemo(() => {
      if (conversation.isGroup) return `${conversation.users.length} membros`
      return 'Ativo'
   }, [conversation.isGroup, conversation.users.length])

   return (
      <div className="flex w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6">
         <div className="flex items-center gap-3">
            <Link
               className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
               href="/conversations"
            >
               <HiChevronLeft size={32} />
            </Link>
            <Avatar user={otherUser} />
            <div className="flex flex-col">
               <span>{conversation.name || otherUser.name}</span>
               <div className="text-sm font-light text-neutral-500">
                  {statusText}
               </div>
            </div>
         </div>
         <HiEllipsisHorizontal
            size={32}
            onClick={() => {}}
            className="cursor-pointer text-sky-500 transition hover:text-sky-600"
         />
      </div>
   )
}
