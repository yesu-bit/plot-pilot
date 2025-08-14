import InPageSidebar from "@/src/components/in-page-sidebar";

export default async function ProtectedSidebar() {
  // const client = await createUpdateClient();
  // const { data } = await client.entitlements.check("premium");

  return (
    <InPageSidebar
      basePath="/dashboard"
      items={[
        {
          label: "General",
          href: "/",
        },
        {
          label: "My Stories",
          href: "/stories",
        },
      ]}
    />
  );
}
