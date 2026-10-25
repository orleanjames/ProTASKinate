import React from 'react';

export default function GuidePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-slate-800">User Guide</h1>
        <p className="text-sm text-slate-500 mt-1">Learn how to navigate and use proTASKinate effectively.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
          <h2 className="text-base font-bold text-slate-800">1. Creating a Task Group</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Go to the <strong>Task Groups</strong> page from the sidebar. Type your new group name into the input field at the top and click <strong>"+ Add Group"</strong>.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
          <h2 className="text-base font-bold text-slate-800">2. Adding Tasks to a Group</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click on any task group card from the Task Groups page to enter that group's folder view. From there, use the input bar to add tasks specific to that group.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
          <h2 className="text-base font-bold text-slate-800">3. Marking Tasks as Done / Not Done</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click the circular checkmark button next to any task title to toggle its status between completed (strikethrough) and active.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
          <h2 className="text-base font-bold text-slate-800">4. Deleting Tasks or Groups</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click the trash icon on any task or group card. A custom confirmation modal will pop up asking for confirmation before permanently deleting the item.
          </p>
        </div>
      </div>
    </div>
  );
}