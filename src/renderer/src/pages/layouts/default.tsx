import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'

export function Default(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  return (
    <Collapsible.Root
      open={isSidebarOpen}
      onOpenChange={setIsSidebarOpen}
      className="h-screen w-screen text-pen-100 flex"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}
