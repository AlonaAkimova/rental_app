"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { resolve } from "path";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const ProfilePage: React.FC = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      const name = session.data?.user?.name || "";
      setUserName(name);
      setImage(session.data?.user?.image || "");
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
        });
      });
    }
  }, [session, status]);
  async function handleProfileInfoUpdate(e: { preventDefault: () => void }) {
    e.preventDefault();
    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          streetAddress,
          phone,
          postalCode,
          city,
          country,
        }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length === 1) {
      const data = new FormData();
      data.set("files", files[0]);
      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setImage(link);
          });
        }
        throw new Error("Something went wrong");
      });
      toast.promise(uploadPromise, {
        loading: "Saving...",
        success: "Upload complete!",
        error: "Upload error",
      });
    }
  }
  return (
    <>
      <section className="mt-8">
        <UserTabs isAdmin={isAdmin} />
        <div className="max-w-md mx-auto mt-8">
          <div className="flex gap-4">
            <div>
              <div className="p-4 rounded-lg relative max-w-[120]">
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
              <label>First and last Name</label>
              <input
                type="text"
                id="userName"
                placeholder="First and Last Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="email"
                id="email"
                disabled={true}
                value={session.data?.user?.email || ""}
                placeholder="email"
              />
              <label>Phone</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                required
                placeholder="Phone number"
              />
              <label>Street Address</label>
              <input
                type="text"
                placeholder="Street address"
                value={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <div className="flex gap-2">
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                </div>
                <div>
                  <label>Postal Code</label>
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </div>
              </div>
              <label>Country</label>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(ev) => setCountry(ev.target.value)}
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
