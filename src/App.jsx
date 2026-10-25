import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import GroupsPage from './pages/GroupsPage';
import TaskListPage from './pages/TaskListPage';
import GuidePage from './pages/GuidePage';
import DevelopersPage from './pages/DevelopersPage';

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        {/* Flex container layout for Sidebar + Main Content */}
        <div className="min-h-screen overflow-y-scroll bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
          <Sidebar />
          
          <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<DashboardPage />} />
              <Route path="/groups" element={<GroupsPage />} />
              <Route path="/groups/:groupId" element={<TaskListPage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/developers" element={<DevelopersPage />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
}