import React from 'react';
import { Sidebar } from "@/components/layout/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
