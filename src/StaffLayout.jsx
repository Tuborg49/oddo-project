import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function StaffLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        role="staff"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="main-content">
        <Header
          role="staff"
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
