import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'

export default async function UsersLayout({
   children,
}: {
   children: ReactNode
}) {
   return (
      // @ts-expect-error Server Component
      <Sidebar>
         <div className="h-full">{children}</div>
      </Sidebar>
   )
}
