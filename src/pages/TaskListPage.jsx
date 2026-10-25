import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function TaskListPage() {
  const { groupId } = useParams();
  const { groups, tasks, addTask, editTask, toggleTask, deleteTask } = useTasks();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskError, setTaskError] = useState(''); // Error alert state
  
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const currentGroup = groups.find((g) => g.id === groupId);
  const groupName = currentGroup ? currentGroup.name : 'Tasks';
  const groupTasks = groupId ? tasks.filter((t) => t.groupId === groupId) : tasks;

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      setTaskError('Please enter a task title.');
      return;
    }
    setTaskError('');
    addTask(newTaskTitle.trim(), groupId || '');
    setNewTaskTitle('');
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!editingTask?.title.trim()) return;
    editTask(editingTask.id, {
      title: editingTask.title.trim(),
      groupId: editingTask.groupId,
      description: editingTask.description || ''
    });
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div>
        <Link to="/groups" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mb-2">
          ← Back to Task Groups
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-800">{groupName}</h1>
          <span className="text-xs font-semibold text-slate-400 bg-slate-200/60 px-3 py-1 rounded-full">
            {groupTasks.length} {groupTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>
      </div>

      {/* Add Task Input with Error Alert */}
      <form onSubmit={handleAddTask} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => {
              setNewTaskTitle(e.target.value);
              if (taskError) setTaskError('');
            }}
            placeholder={`Add a task to ${groupName}...`}
            className={`flex-1 px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 shadow-sm ${
              taskError ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'
            }`}
          />
          <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm">
            + Add Task
          </button>
        </div>
        {taskError && (
          <p className="text-xs font-semibold text-red-500">{taskError}</p>
        )}
      </form>

      {/* Task List */}
      <div className="space-y-2">
        {groupTasks.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-sm">
            No tasks in this group yet. Add one above!
          </div>
        ) : (
          groupTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-300 transition gap-2 overflow-hidden">
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                    task.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 hover:border-emerald-500'
                  }`}
                >
                  {task.completed && <span className="text-xs font-bold">✓</span>}
                </button>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className={`text-sm font-medium truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.title}
                  </span>
                  {task.description && <span className="text-xs text-slate-400 truncate mt-0.5">{task.description}</span>}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => setEditingTask(task)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
                </button>
                <button onClick={() => setDeletingTask(task)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg">
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">Edit Task</h3>
              <button onClick={() => setEditingTask(null)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600">Task Title</label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">Group</label>
                <select
                  value={editingTask.groupId || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, groupId: e.target.value })}
                  className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Ungrouped</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">Description</label>
                <textarea
                  rows={4}
                  value={editingTask.description || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  placeholder="Write notes or details..."
                  className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingTask(null)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingTask && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 space-y-4">
            <h3 className="text-lg font-black text-slate-800">Delete Task?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-700">"{deletingTask.title}"</span>?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setDeletingTask(null)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
              <button onClick={() => { deleteTask(deletingTask.id); setDeletingTask(null); }} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-sm">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}