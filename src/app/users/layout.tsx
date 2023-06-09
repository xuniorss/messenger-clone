import getUser from '@/actions/getUsers'
import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'

import { UserList } from './components/UserList'

export default async function UsersLayout({
   children,
}: {
   children: ReactNode
}) {
   const users = await getUser()

   return (
      // @ts-expect-error Server Component
      <Sidebar>
         <div className="h-full">
            <UserList items={users} />
            {children}
         </div>
      </Sidebar>
   )
}
