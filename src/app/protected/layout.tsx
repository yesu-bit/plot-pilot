import Content from "@/src/components/content";
import ProtectedSidebar from "@/src/components/protected-sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Content>
      <div className="flex w-full h-full">
        <ProtectedSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </Content>
  );
}
