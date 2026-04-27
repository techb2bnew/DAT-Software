import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <Outlet />
    </div>
  )
}