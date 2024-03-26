"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage: React.FC = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const userImage = session.data?.user?.image;
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data?.user?.name || "");
    }
  }, [session, status]);
  async function handleProfileInfoUpdate(e: { preventDefault: () => void }) {
    e.preventDefault();
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });
  }
  if (status === "loading") {
    return "Loading ...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <>
      <section className="mt-8">
        <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
        <div className="max-w-md mx-auto">
          <div className="flex gap-2 items-center">
            <div>
              <div className="p-4 rounded-lg relative">
                <Image
                  className="rounded-lg w-full h-full mb-2"
                  src={userImage ? userImage : ""}
                  width={96}
                  height={96}
                  alt="avatar"
                />

                <button type="button">Edit</button>
              </div>
            </div>
            <form className="grow" onSubmit={handleProfileInfoUpdate}>
              <input
                type="text"
                placeholder="First and Last Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="email"
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
