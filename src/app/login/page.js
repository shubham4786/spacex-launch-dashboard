"use client";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const route = useRouter();
  const { googleSignIn } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black pb-40">
      <Image src={logo} alt="logo" priority />
      <div className=" p-4 rounded shadow-md w-full max-w-md ">
        <button
          className="bg-blue-900 text-white px-4 py-4 rounded-full w-full  hover:bg-blue-600 "
          onClick={handleSignIn}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
