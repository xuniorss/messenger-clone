'use client'

import { useConversation } from '@/hooks/useConversation'
import { FullMessageType } from '@/types'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { MessageBox } from '../MessageBox'
import { pusherClient } from '@/libs/pusher'
import { find } from 'lodash'

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

   useEffect(() => {
      pusherClient.subscribe(conversationId)
      bottonRef?.current?.scrollIntoView()

      const messageHandler = (message: FullMessageType) => {
         axios.post(`/api/conversations/${conversationId}/seen`)

         setMessages((current) => {
            if (find(current, { id: message.id })) return current
            return [...current, message]
         })

         bottonRef?.current?.scrollIntoView()
      }

      const updateMessageHandler = (newMessage: FullMessageType) => {
         setMessages((current) =>
            current.map((currentMessage) => {
               if (currentMessage.id === newMessage.id) return newMessage
               return currentMessage
            })
         )
      }

      pusherClient.bind('messages:new', messageHandler)
      pusherClient.bind('message:update', updateMessageHandler)

      return () => {
         pusherClient.unsubscribe(conversationId)
         pusherClient.unbind('messages:new', messageHandler)
         pusherClient.unbind('message:update', updateMessageHandler)
      }
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
