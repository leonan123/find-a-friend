import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

import Logo from '@/assets/logo.svg'
import MainImage from '@/assets/main-image.webp'
export const Route = createRootRoute({
  component: AuthLayout,
})

function AuthLayout() {
  const leftSideRef = useRef<HTMLDivElement>(null)

  function handleScroll() {
    if (leftSideRef.current && window.innerWidth > 1024) {
      leftSideRef.current.style.transform = `translateY(${window.scrollY}px)`
    } else {
      leftSideRef.current?.removeAttribute('style')
    }
  }

  function handleResize() {
    if (window.innerWidth > 1024) return
    leftSideRef.current?.removeAttribute('style')
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <div className="mx-auto flex size-full min-h-dvh max-w-[1600px] flex-col gap-10 px-10 py-12 md:px-28 md:py-20 lg:flex-row lg:gap-32">
      <div className="relative w-full translate-z-0 lg:w-1/2">
        <div
          className="bg-red-primary flex size-full max-h-[calc(100dvh-8rem)] flex-col justify-between gap-20 rounded-2xl px-12 py-8"
          ref={leftSideRef}
        >
          <img
            src={Logo}
            alt="Find a friend"
            width={174}
            height={45.32}
            className="mx-auto mt-8 lg:mt-20"
          />

          <img
            src={MainImage}
            alt=""
            className="mx-auto w-full max-w-3xs lg:max-w-none"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <Outlet />
      </div>
    </div>
  )
}
