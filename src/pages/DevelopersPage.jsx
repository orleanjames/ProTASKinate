import React from 'react';

export default function DevelopersPage() {
  const developers = [
    { name: 'Orlean Sarmiento', role: 'Developer' },
    { name: 'John Paul Kenneth Banda', role: 'Developer' },
    { name: 'Alejandro D. Sayo', role: 'Developer' },
    { name: 'Tristan Castaneda', role: 'Developer' }
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Developers</h1>
        <p className="text-sm text-slate-500 mt-1">Meet the creators behind proTASKinate.</p>
      </div>

      {/* Single Big Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm divide-y divide-slate-100 overflow-hidden">
        {developers.map((dev, index) => (
          <div key={index} className="flex items-center justify-between p-5 hover:bg-slate-50/60 transition">
            <h2 className="text-sm font-bold text-slate-800">{dev.name}</h2>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              {dev.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}