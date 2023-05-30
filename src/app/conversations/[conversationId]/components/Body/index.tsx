'use client'

import { useConversation } from '@/hooks/useConversation'
import { FullMessageType } from '@/types'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { MessageBox } from '../MessageBox'

interface BodyProps {
   initialMessages: Array<FullMessageType>
}

export const Body = ({ initialMessages }: BodyProps) => {
   const [messages, setMessages] = useState(initialMessages)
   const bottonRef = useRef<HTMLDivElement>(null)

   const { conversationId } = useConversation()

   useEffect(() => {
      axios.post(`/api/conversations/${conversationId}/seen`)
   }, [conversationId])

   return (
      <div className="flex-1 overflow-y-auto">
         {messages.map((message, i) => (
            <MessageBox
               key={message.id}
               isLast={i === messages.length - 1}
               data={message}
            />
         ))}
         <div ref={bottonRef} className="pt-24" />
      </div>
   )
}
