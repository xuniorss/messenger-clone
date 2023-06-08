'use client'

import { Avatar } from '@/components/Avatar'
import { AvatarGroup } from '@/components/AvatarGroup'
import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import { ProfileDrawer } from '../ProfileDrawer'

interface HeaderProps {
   conversation: Conversation & { users: Array<User> }
}

export const Header = ({ conversation }: HeaderProps) => {
   const otherUser = useOtherUser(conversation)
   const [drawerOpen, setDrawerOpen] = useState(false)

   const statusText = useMemo(() => {
      if (conversation.isGroup) return `${conversation.users.length} membros`
      return 'Ativo'
   }, [conversation.isGroup, conversation.users.length])

   return (
      <>
         <ProfileDrawer
            data={conversation}
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
         />
         <div className="flex w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6">
            <div className="flex items-center gap-3">
               <Link
                  className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
                  href="/conversations"
               >
                  <HiChevronLeft size={32} />
               </Link>
               {conversation.isGroup && (
                  <AvatarGroup users={conversation.users} />
               )}
               {!conversation.isGroup && <Avatar user={otherUser} />}
               <div className="flex flex-col">
                  <span>{conversation.name || otherUser.name}</span>
                  <div className="text-sm font-light text-neutral-500">
                     {statusText}
                  </div>
               </div>
            </div>
            <HiEllipsisHorizontal
               size={32}
               onClick={() => setDrawerOpen(true)}
               className="cursor-pointer text-sky-500 transition hover:text-sky-600"
            />
         </div>
      </>
   )
}
