// src/components/Sidebar.tsx

import type { Page } from "../types";
import { Home, List, Menu, X } from 'lucide-react'; // Import 'X' icon for the close button
import { useState } from 'react';

type SidebarProps = {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: Home },
    { id: 'tasks' as Page, label: 'Tasks', icon: List },
    // { id: 'analytics' as Page, label: 'Analytics', icon: BarChart3 },
    // { id: 'settings' as Page, label: 'Settings', icon: Settings },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Made fixed for all screen sizes */}
      <div
        className={`bg-green-700 text-white w-64 h-screen fixed p-4 top-0 left-0 z-50 transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end mb-2">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-300 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-8 items-center">
          <h1 className="text-2xl font-bold">Tracker</h1>
          <p className="text-gray-300 text-sm">Project Management</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-green-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};