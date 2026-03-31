import { Bell, User, HelpCircle, Menu } from 'lucide-react';
import { Link } from 'react-router';

export function TopNav() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-end gap-4">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <Link to="/settings" className="flex items-center gap-2 pl-4 border-l border-gray-200 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm font-medium text-gray-900">My Account</div>
        </Link>
      </div>
    </header>
  );
}