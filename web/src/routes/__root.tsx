import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <HeadContent />

      <Outlet />
    </React.Fragment>
  )
}
