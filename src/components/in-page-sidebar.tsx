"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Component } from "react";

type Item = {
  label: string;
  href: string;
  disabled?: boolean;
  icon?: React.ReactNode;
};

export default function InPageSidebar({
  basePath,
  items,
}: {
  basePath: string;
  items: Item[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between min-w-[250px] mr-[8px] h-full px-3 py-8 border-r-[1px]">
      <div className="flex flex-col gap-4 px-2">
        {items.map((item, index) => {
          const { label, href, disabled = false, icon } = item;
          const fullHref = `${basePath}${href}`;
          const isActive =
            href === "/"
              ? pathname === basePath || pathname === `${basePath}/`
              : pathname === fullHref;
          return (
            <SidebarLink
              key={index}
              href={fullHref}
              label={label}
              isActive={isActive}
              isDisabled={disabled}
              icon={icon}
            />
          );
        })}
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  label,
  isActive,
  isDisabled,
  icon,
}: {
  href: string;
  label: string;
  isActive: boolean;
  isDisabled: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <>
      <Link
        href={href}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
        }}
        // className={cn(
        //   "p-2 py-3 rounded-md text-sm text-gray-500 hover:text-foreground transition-colors",
        //   isActive &&
        //     "bg-accent text-foreground font-medium hover:text-foreground",
        //   isDisabled && "text-gray-600 cursor-not-allowed hover:text-gray-700"
        // )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <div className="leading-none text-md font-medium">{label}</div>
        </div>
      </Link>
    </>
  );
}
