'use client'

import { useEffect, useRef } from 'react'

interface ClientBodyProps {
  className?: string
  children: React.ReactNode
}

export default function ClientBody({ className, children }: ClientBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Merge className with existing body classes instead of replacing
    if (className) {
      const newClasses = className.split(' ').filter(Boolean)

      // Add new classes that don't already exist
      newClasses.forEach(cls => {
        if (!document.body.classList.contains(cls)) {
          document.body.classList.add(cls)
        }
      })
    }

    // Clean up any browser extension attributes that might cause hydration issues
    const extensionAttributes = ['cz-shortcut-listen']
    extensionAttributes.forEach(attr => {
      if (document.body.hasAttribute(attr)) {
        document.body.removeAttribute(attr)
      }
    })
  }, [className])

  // Return a div that will contain the app content
  // This avoids hydration issues with the body element
  return <div ref={bodyRef}>{children}</div>
}