import Link from "next/link";
import React from "react";
interface UserTabsProps {
  isAdmin: boolean;
}

const UserTabs: React.FC<UserTabsProps> = ({ isAdmin }) => {
  return (
    <>
      <div className="flex mx-auto gap-2 tabs justify-center">
        <Link className={"active"} href={"/profile"}>
          Profile
        </Link>
        {isAdmin && (
          <>
            <Link href={"/categories"}>Categories</Link>
            <Link href={"/cloths-items"}>Cloths items</Link>
            <Link href={"/users"}>Users</Link>
          </>
        )}
      </div>
    </>
  );
};
export default UserTabs;
