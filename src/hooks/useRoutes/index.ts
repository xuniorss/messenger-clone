import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { IconType } from 'react-icons'
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'

import { useConversation } from '../useConversation'

type RoutesProps = {
   label: string
   href: string
   icon: IconType
   active?: boolean
   onClick?: () => void
}

export const useRoutes = () => {
   const pathname = usePathname()
   const { conversationId } = useConversation()

   const routes: Array<RoutesProps> = useMemo(
      () => [
         {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId,
         },
         {
            label: 'Usuários',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users',
         },
         {
            label: 'Sair',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle,
         },
      ],
      [conversationId, pathname]
   )

   return routes
}
