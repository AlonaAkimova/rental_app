"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Category } from "@/models/Category";
interface Category {
  _id: string;
  name: string;
}
const CategoriesPage: React.FC = () => {
  const [CategoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }
  async function handleCategorySubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const creationPromise = new Promise<void>(async (resolve, reject) => {
      const data = { name: CategoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error, sorry",
    });
  }
  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update category" : "New category name"}
              {editedCategory && (
                <>
                  :<b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
        {categories?.length > 0 &&
          categories.map((c: Category) => {
            return (
              <button
                key={c._id}
                onClick={() => {
                  setEditedCategory(c);
                  setCategoryName(c.name);
                }}
                className="bg-gray-200 cursor-pointer rounded-xl p-2 px-4 flex gap-1 mb-1"
              >
                <span key={c._id}>{c.name}</span>
              </button>
            );
          })}
      </div>
    </section>
  );
};
export default CategoriesPage;
