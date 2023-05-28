import getCurrentUser from '@/actions/getCurrentUser'
import { ReactNode } from 'react'

import { DesktopSidebar } from './components/DesktopSidebar'
import { MobileFooter } from './components/MobileFooter'

export const Sidebar = async ({ children }: { children: ReactNode }) => {
   const currentUser = await getCurrentUser()

   return (
      <div className="h-full">
         <DesktopSidebar currentUser={currentUser!} />
         <MobileFooter />
         <main className="h-full lg:pl-20">{children}</main>
      </div>
   )
}
