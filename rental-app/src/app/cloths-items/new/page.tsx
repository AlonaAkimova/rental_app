"use client";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import EditImage from "@/components/layout/EditImage";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";

const NewClothItemPage: React.FC = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  async function handleFormSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const data = { image, name, description, basePrice };
    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/cloths-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Saved",
      error: "Error",
    });

    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect("/cloths-items");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }
  return (
    <>
      <section className="mt-8">
        <UserTabs isAdmin={true} />
        <div className="max-w-md mx-auto mt-8">
          <Link href={"/cloths-items"} className="button">
            <span>Show all items</span>
            <Left />
          </Link>
        </div>
        <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
          <div
            className="grid items-start gap-4"
            style={{ gridTemplateColumns: ".3fr .7fr" }}
          >
            <div className="">
              <EditImage link={image} setLink={setImage} />
            </div>
            <div className="grow">
              <label>Item name</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
              <label>Base price</label>
              <input
                type="text"
                value={basePrice}
                onChange={(ev) => setBasePrice(ev.target.value)}
              />
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewClothItemPage;
