"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      setLoading(false);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-2 ring-gray-100 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Auth JS</h1>
        <p className="text-gray-500 text-sm">
          Secure, simple and customizable authentication built with Next.js and
          love 💙
        </p>

        <div className="space-y-4">
          <Link href="/profile">
            <button className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
              VISIT PROFILE
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="mt-5 w-full rounded-2xl border-b-4 border-b-red-300 bg-white py-3 font-bold text-red-500 ring-2 ring-red-300 hover:bg-red-100 active:translate-y-[0.125rem] active:border-b-red-200"
          >
            {loading ? "LOGGING OUT" : "LOGOUT"}
          </button>
        </div>

        <footer className="pt-6 text-xs text-gray-400">
          Built with ❤️ by your team. Check the code on{" "}
          <a
            href="https://github.com/AyushSoni86/next-js-authentication"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-500 hover:underline"
          >
            GitHub
          </a>
        </footer>
      </div>
    </main>
  );
}
