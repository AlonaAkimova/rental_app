"use client";

import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ClothItem {
  _id: string;
  name: string;
}

const ClothingItems: React.FC = () => {
  const [clothsItems, setClothsItems] = useState<ClothItem[]>([]);
  const { loading, data } = useProfile();
  useEffect(() => {
    fetch("/api/cloths-items").then((res) => {
      res.json().then((clothingItems) => {
        setClothsItems(clothingItems);
      });
    });
  }, []);
  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/cloths-items/new"}>
          <span> Create new item</span>

          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-4">Edit menu item: </h2>
        {clothsItems?.length > 0 &&
          clothsItems.map((item) => (
            <button className="mb-1">{item.name} </button>
          ))}
      </div>
    </section>
  );
};
export default ClothingItems;
