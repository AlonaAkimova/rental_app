import React from "react";
import Link from "next/link";
interface HeaderProps {}
const Header: React.FC<HeaderProps> = (props) => {
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
        <Link
          href={"/login"}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Login
        </Link>
        <Link href={"/register"}>Register</Link>
      </nav>
    </header>
  );
};

export default Header;
