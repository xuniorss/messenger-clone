'use client'

import { Avatar } from '@/components/Avatar'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

interface UserBoxProps {
   data: User
}

export const UserBox = ({ data }: UserBoxProps) => {
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   const handleClick = useCallback(() => {
      setIsLoading(true)

      axios
         .post('/api/conversations', { userId: data.id })
         .then((data) => {
            router.push(`/conversations/${data.data.id}`)
         })
         .finally(() => setIsLoading(false))
   }, [data.id, router])

   return (
      <div
         onClick={handleClick}
         className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-white p-3 transition hover:bg-neutral-100"
      >
         <Avatar user={data} />
         <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
               <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                     {data.name}
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
