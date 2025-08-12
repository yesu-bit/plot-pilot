import Content from "@/src/components/content";
import ProtectedSidebar from "@/src/components/protected-sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Content>
      <div className="flex w-full h-full">
        <ProtectedSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </Content>
  );
}
