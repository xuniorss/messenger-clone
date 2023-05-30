import getConversationById from '@/actions/getConversationById'
import getMessages from '@/actions/getMessages'
import { EmptyState } from '@/components/EmptyState'
import { Body } from './components/Body'
import { Form } from './components/Form'
import { Header } from './components/Header'

interface IParams {
   conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {
   const { conversationId } = params

   const conversation = await getConversationById(conversationId)
   const messages = await getMessages(conversationId)

   if (!conversation) {
      return (
         <div className="h-full lg:pl-80">
            <div className="flex h-full flex-col">
               <EmptyState />
            </div>
         </div>
      )
   }

   return (
      <div className="h-full lg:pl-80">
         <div className="flex h-full flex-col">
            <Header conversation={conversation} />
            <Body initialMessages={messages} />
            <Form />
         </div>
      </div>
   )
}

export default ConversationId
