"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/users/login", userDetails);
      toast.success(response?.data.message || "Login successful!");
      router.push("/profile");
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      const message = error.response?.data?.error || "Login failed.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password } = userDetails;
    setButtonDisabled(!(email && password));
    setError("");
  }, [userDetails]);

  return (
    <div className="p-6">
      <div className="absolute left-1/2 top-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
        <div className="space-y-4">
          <header className="mb-3 text-2xl font-bold">Log in</header>

          {/* Email Input */}
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="email"
              placeholder="Email"
              className="my-3 w-full border-none bg-transparent outline-none"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="password"
              placeholder="Password"
              className="my-3 w-full border-none bg-transparent outline-none"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
            />
            <Link
              href="/forgotPassword"
              className="font-medium text-gray-400 hover:text-gray-500"
            >
              FORGOT?
            </Link>
          </div>

          {/* Error */}
          {error && <div className="w-full px-4 text-red-500">{error}</div>}

          {/* Submit Button */}
          <button
            onClick={handleLogin}
            disabled={buttonDisabled || loading}
            className={`w-full rounded-2xl border-b-4 py-3 font-bold text-white active:translate-y-[0.125rem] active:border-b-blue-400 ${
              buttonDisabled || loading
                ? "bg-gray-400 border-b-gray-500 cursor-not-allowed"
                : "bg-blue-500 border-b-blue-600 hover:bg-blue-400 active:border-b-blue-400"
            }`}
          >
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <a
            href="#"
            className="rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-2.5 font-bold text-blue-700 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200"
          >
            FACEBOOK
          </a>
          <a
            href="#"
            className="rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-2.5 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200"
          >
            GOOGLE
          </a>
        </div>

        {/* OR Divider */}
        <div className="flex items-center space-x-4">
          <hr className="w-full border border-gray-300" />
          <div className="font-semibold text-gray-400">OR</div>
          <hr className="w-full border border-gray-300" />
        </div>

        {/* Sign Up */}
        <footer>
          <button
            onClick={() => router.push("/signup")}
            className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
          >
            CREATE ACCOUNT HERE
          </button>
          <div className="mt-8 text-sm text-gray-400">
            By signing in to auth.com, you agree to our{" "}
            <a href="#" className="font-medium text-gray-500">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-gray-500">
              Privacy Policy
            </a>
            .
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
