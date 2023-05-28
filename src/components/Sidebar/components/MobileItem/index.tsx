'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useCallback } from 'react'
import { IconType } from 'react-icons'

interface MobileItemProps {
   href: string
   icon: IconType
   active?: boolean
   onClick?: () => void
}

export const MobileItem = ({
   href,
   icon: Icon,
   active,
   onClick,
}: MobileItemProps) => {
   const handleClick = useCallback(() => {
      if (onClick) return onClick()
   }, [onClick])

   return (
      <Link
         onClick={handleClick}
         href={href}
         className={clsx(
            `group flex w-full justify-center gap-x-3 p-4 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-black`,
            active && 'bg-gray-100 text-black'
         )}
      >
         <Icon className="h-6 w-6" />
      </Link>
   )
}
