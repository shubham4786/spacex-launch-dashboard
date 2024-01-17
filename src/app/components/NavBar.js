"use client";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logOut } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl">
          SpaceX
        </Link>
        <div className="flex items-center space-x-5">
          <Link className="text-white" href="/">
            Home
          </Link>
          {!user ? null : (
            <Link className="text-white" href="/dashboard">
              Dashboard
            </Link>
          )}
          {!user ? (
            <Link className="text-white" href="/login">
              Login
            </Link>
          ) : (
            <Link onClick={handleSignOut} href="/" className="text-white">
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
