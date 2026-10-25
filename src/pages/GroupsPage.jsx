import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function GroupsPage() {
  const { groups, tasks, addGroup, editGroup, deleteGroup } = useTasks();
  const navigate = useNavigate();

  const [newGroupName, setNewGroupName] = useState('');
  const [groupError, setGroupError] = useState(''); // Error alert state
  const [editingGroup, setEditingGroup] = useState(null);
  const [deletingGroup, setDeletingGroup] = useState(null);

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) {
      setGroupError('Please enter a group name.');
      return;
    }
    setGroupError('');
    addGroup(newGroupName);
    setNewGroupName('');
  };

  const handleSaveGroup = (e) => {
    e.preventDefault();
    if (!editingGroup?.name.trim()) return;
    editGroup(editingGroup.id, editingGroup.name);
    setEditingGroup(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Task Groups</h1>
        <p className="text-sm text-slate-500 mt-1">Create a group task here!</p>
        <form onSubmit={handleAddGroup} className="mt-3 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => {
                setNewGroupName(e.target.value);
                if (groupError) setGroupError('');
              }}
              placeholder="New group name (e.g., Thesis, Work)..."
              className={`flex-1 px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                groupError ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'
              }`}
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition"
            >
              + Add Group
            </button>
          </div>
          {groupError && (
            <p className="text-xs font-semibold text-red-500">{groupError}</p>
          )}
        </form>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group) => {
          const groupTasks = tasks.filter((t) => t.groupId === group.id);

          return (
            <div
              key={group.id}
              onClick={() => navigate(`/groups/${group.id}`)}
              className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-5 shadow-sm space-y-3 cursor-pointer transition group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <h2 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 truncate transition">
                    {group.name}
                  </h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingGroup({ id: group.id, name: group.name });
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition shrink-0"
                    title="Rename Group"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingGroup({ id: group.id, name: group.name });
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0"
                    title="Delete Group"
                  >
                    🗑️
                  </button>
                </div>

                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">
                  {groupTasks.length} {groupTasks.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>

              <p className="text-xs text-slate-400">Click to view and manage tasks inside this group</p>
            </div>
          );
        })}
      </div>

      {/* Rename Group Modal */}
      {editingGroup && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Rename Group</h3>
            <form onSubmit={handleSaveGroup} className="space-y-4">
              <input
                type="text"
                value={editingGroup.name}
                onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingGroup(null)}
                  className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingGroup && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 space-y-4">
            <h3 className="text-lg font-black text-slate-800">Delete Group?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-700">"{deletingGroup.name}"</span>? Tasks inside will become ungrouped.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingGroup(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteGroup(deletingGroup.id);
                  setDeletingGroup(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}