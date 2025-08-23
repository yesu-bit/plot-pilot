import InPageSidebar from "./in-page-sidebar";
import { BookOpenText, LayoutDashboard, UsersRound } from "lucide-react";

export default function ProtectedSidebar() {
  return (
    <InPageSidebar
      basePath="/dashboard"
      items={[
        {
          label: "Overview",
          href: "/",
          icon: <LayoutDashboard size={18} />,
        },
        {
          label: "My Stories",
          href: "/stories",
          icon: <BookOpenText size={18} />,
        },
        {
          label: "My Characters",
          href: "/characters",
          icon: <UsersRound size={18} />,
        },
      ]}
    />
  );
}
