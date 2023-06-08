import getConversations from '@/actions/getConversations'
import getUser from '@/actions/getUsers'
import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'
import { ConversationList } from './components/ConversationList'

export default async function ConversationsLayout({
   children,
}: {
   children: ReactNode
}) {
   const conversations = await getConversations()
   const users = await getUser()

   return (
      // @ts-expect-error Server Component
      <Sidebar>
         <div className="h-full">
            <ConversationList users={users} initialItems={conversations} />
            {children}
         </div>
      </Sidebar>
   )
}
