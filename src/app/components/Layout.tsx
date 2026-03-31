import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <TopNav />
      
      <main className="ml-64 pt-14">
        <Outlet />
      </main>
      
      <Toaster position="top-right" richColors />
    </div>
  );
}