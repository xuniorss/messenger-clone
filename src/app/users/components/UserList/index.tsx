'use client'

import { User } from '@prisma/client'
import { UserBox } from '../UserBox'

interface UserListPros {
   items: User[]
}

export const UserList = ({ items }: UserListPros) => {
   return (
      <aside className="fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0">
         <div className="px-5">
            <div className="flex-col">
               <div className="py-4">
                  <h2 className="text-2xl font-bold text-neutral-800">
                     Pessoas
                  </h2>
               </div>
            </div>
            {items.map((item) => (
               <UserBox key={item.id} data={item} />
            ))}
         </div>
      </aside>
   )
}
