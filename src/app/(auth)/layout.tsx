import Content from "@/src/components/content";

export default function UnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Content>{children}</Content>;
}
