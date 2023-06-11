import { ActiveStatus } from '@/components/ActiveStatus'
import AuthContext from '@/context/AuthContext'
import ToasterContext from '@/context/ToasterContext'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: 'Messenger Clone',
   description: 'Messenger Clone',
}

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="pt-br">
         <body className={inter.className}>
            <AuthContext>
               <ToasterContext />
               <ActiveStatus />
               {children}
            </AuthContext>
         </body>
      </html>
   )
}
