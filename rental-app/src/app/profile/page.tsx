"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage: React.FC = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data?.user?.name || "");
      setImage(session.data?.user?.image || "");
    }
  }, [session, status]);
  async function handleProfileInfoUpdate(e: { preventDefault: () => void }) {
    e.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }
  if (status === "loading") {
    return "Loading ...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length === 1) {
      const data = new FormData();
      data.set("files", files[0]);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const link = await response.json();
      setImage(link);
    }
  }
  return (
    <>
      <section className="mt-8">
        <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>

        <div className="max-w-md mx-auto">
          {saved && (
            <h2 className="text-center border border-green-300 bg-green-100 rounded-lg p-4">
              Profile saved
            </h2>
          )}
          {isSaving && (
            <h2 className="text-center border border-blue-300 bg-blue-100 rounded-lg p-4">
              Saving...
            </h2>
          )}

          <div className="flex gap-2 items-center">
            <div>
              <div className="p-4 rounded-lg relative">
                {image && (
                  <Image
                    className="rounded-lg w-full h-full mb-2"
                    src={image}
                    width={96}
                    height={96}
                    alt="avatar"
                  />
                )}

                <label>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span
                    onClick={() => {}}
                    className="block border rounded-lg p-2 text-center border-gray-300 cursor-pointer"
                  >
                    Edit
                  </span>
                </label>
              </div>
            </div>
            <form className="grow" onSubmit={handleProfileInfoUpdate}>
              <input
                type="text"
                id="userName"
                placeholder="First and Last Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="email"
                id="email"
                disabled={true}
                value={session.data?.user?.email || undefined}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
