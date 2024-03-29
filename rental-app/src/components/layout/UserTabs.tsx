"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface UserTabsProps {
  isAdmin: boolean;
}

const UserTabs: React.FC<UserTabsProps> = ({ isAdmin }) => {
  const path = usePathname();
  return (
    <>
      <div className="flex mx-auto gap-2 tabs justify-center">
        <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
          Profile
        </Link>
        {isAdmin && (
          <>
            <Link
              className={path === "/categories" ? "active" : ""}
              href={"/categories"}
            >
              Categories
            </Link>
            <Link
              className={path === "/cloths-items" ? "active" : ""}
              href={"/cloths-items"}
            >
              Cloths items
            </Link>
            <Link className={path === "/users" ? "active" : ""} href={"/users"}>
              Users
            </Link>
          </>
        )}
      </div>
    </>
  );
};
export default UserTabs;
