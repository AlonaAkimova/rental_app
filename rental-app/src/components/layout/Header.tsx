"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
interface HeaderProps {}
const Header: React.FC<HeaderProps> = (props) => {
  const session = useSession();
  console.log(session);
  const status = session.status;

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text 2xl" href="/">
          Closet Carousel
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <button
            onClick={() => signOut()}
            className="bg-primary rounded-full text-white px-8 py-2"
          >
            Logout
          </button>
        )}
        {status === "unauthenticated" && (
          <>
            <Link
              href={"/login"}
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Login
            </Link>
            <Link href={"/register"}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
