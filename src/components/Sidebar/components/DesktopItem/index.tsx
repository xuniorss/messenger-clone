'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useCallback } from 'react'
import { IconType } from 'react-icons'

interface DesktopItemProps {
   label: string
   icon: IconType
   href: string
   onClick?: () => void
   active?: boolean
}

export const DesktopItem = ({
   label,
   icon: Icon,
   href,
   onClick,
   active,
}: DesktopItemProps) => {
   const handleClick = useCallback(() => {
      if (onClick) return onClick()
   }, [onClick])

   return (
      <li onClick={handleClick}>
         <Link
            href={href}
            className={clsx(
               `group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-black`,
               active && 'bg-gray-100 text-black'
            )}
         >
            <Icon className="h-6 w-6 shrink-0" />
            <span className="sr-only">{label}</span>
         </Link>
      </li>
   )
}
