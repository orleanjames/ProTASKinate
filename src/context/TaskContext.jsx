import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [groups, setGroups] = useState([
    { id: 'doom-scroll', name: 'Doom Scroll' },
    { id: 'personal', name: 'Personal Tasks' }
  ]);

  const [tasks, setTasks] = useState([
    { id: '1', title: 'Instagram Reels', description: '', completed: false, groupId: 'doom-scroll' },
    { id: '2', title: 'Facebook Reels', description: '', completed: false, groupId: 'doom-scroll' },
    { id: '3', title: 'Tiktok', description: '', completed: false, groupId: 'doom-scroll' },
    { id: '4', title: 'Youtube Shorts', description: '', completed: false, groupId: 'doom-scroll' },
    { id: '5', title: 'Gym', description: '', completed: false, groupId: 'personal' }
  ]);

  const [notes, setNotes] = useState([]);

  // --- Task Actions ---
  const addTask = (title, groupId = '', description = '') => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      groupId
    };
    setTasks(prev => [...prev, newTask]);
  };

  const editTask = (taskId, updatedFields) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, ...updatedFields } : t))
    );
  };

  const toggleTask = (taskId) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // --- Group Actions ---
  const addGroup = (name) => {
    if (!name.trim()) return;
    const id = name.toLowerCase().trim().replace(/\s+/g, '-');
    if (!groups.some(g => g.id === id)) {
      setGroups(prev => [...prev, { id, name: name.trim() }]);
    }
  };

  const editGroup = (groupId, newName) => {
    if (!newName.trim()) return;
    setGroups(prev =>
      prev.map(g => (g.id === groupId ? { ...g, name: newName.trim() } : g))
    );
  };

  const deleteGroup = (groupId) => {
    setGroups(prev => prev.filter(g => g.id !== groupId));
    // Unassign tasks from the deleted group so they become ungrouped
    setTasks(prev =>
      prev.map(t => (t.groupId === groupId ? { ...t, groupId: '' } : t))
    );
  };

  // --- Note Actions ---
  const addNote = (noteData) => {
    const newNote = {
      id: Date.now().toString(),
      title: typeof noteData === 'string' ? noteData : noteData.title,
      body: noteData.body || ''
    };
    setNotes(prev => [...prev, newNote]);
  };

  const deleteNote = (noteId) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  return (
    <TaskContext.Provider
      value={{
        groups,
        tasks,
        notes,
        addTask,
        editTask,
        toggleTask,
        deleteTask,
        addGroup,
        editGroup,
        deleteGroup,
        addNote,
        deleteNote
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);