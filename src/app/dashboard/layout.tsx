import ProtectedSidebar from "@/src/components/protected-sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-screen bg-white">
      <ProtectedSidebar />
      <div className="flex-1  h-full px-4 py-8">{children}</div>
    </div>
  );
}
