"use client";

import ProtectedSidebar from "@/src/components/protected-sidebar";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-200 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ProtectedSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Mobile header with hamburger menu */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
