import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navs = [
    { path: '/home', label: 'Dashboard' },
    { path: '/groups', label: 'Task Groups' },
    { path: '/guide', label: 'User Guide' },
    { path: '/developers', label: 'Developers' }
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0 md:min-h-screen p-4 sm:p-6 flex flex-col justify-between shadow-sm">
      <div>
        {/* Brand Header */}
        <div className="mb-8">
          <div className="font-black text-xl text-emerald-700 tracking-tight flex items-center gap-2">
            <span>ProTASKtinate.</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navs.map(n => (
            <NavLink
              key={n.path}
              to={n.path}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-bold transition flex items-center gap-3 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}