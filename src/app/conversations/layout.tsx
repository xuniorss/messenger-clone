import getConversations from '@/actions/getConversations'
import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'
import { ConversationList } from './components/ConversationList'

export default async function ConversationsLayout({
   children,
}: {
   children: ReactNode
}) {
   const conversations = await getConversations()

   return (
      // @ts-expect-error Server Component
      <Sidebar>
         <div className="h-full">
            <ConversationList initialItems={conversations} />
            {children}
         </div>
      </Sidebar>
   )
}
