import { useParams } from 'next/navigation'
import { useMemo } from 'react'

type Params = {
   conversationId: string
}

export const useConversation = () => {
   const params = useParams() as Params

   const conversationId = useMemo(() => {
      if (!params?.conversationId) return ''

      return params.conversationId as string
   }, [params.conversationId])

   const isOpen = useMemo(() => !!conversationId, [conversationId])

   return useMemo(() => ({ isOpen, conversationId }), [isOpen, conversationId])
}
