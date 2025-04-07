"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-2 ring-gray-100 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Auth JS</h1>
        <p className="text-gray-500 text-sm">
          Secure, simple and customizable authentication built with Next.js and
          love 💙
        </p>

        <div className="space-y-4">
          <Link href="/login">
            <button className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className="mt-5 w-full rounded-2xl border-b-4 border-b-gray-300 bg-white py-3 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-100 active:translate-y-[0.125rem] active:border-b-gray-200">
              Sign Up
            </button>
          </Link>
        </div>

        <footer className="pt-6 text-xs text-gray-400">
          Built with ❤️ by your team. Check the code on{" "}
          <a
            href="https://github.com"
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
