"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    try {
      setError("");
      const response: any = await axios.post("/api/users/login", userDetails);
      router.push("/profile");
      toast.success(response?.data.message);
    } catch (error: any) {
      console.log("login failed::\n ", error.response?.data.error);
      toast.error(error.response?.data.error);
      setError(error.response?.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails.email.length > 0 && userDetails.password.length > 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(true);
      setError("");
    }
  }, [userDetails]);

  return (
    <div className="p-6">
      <div className="absolute left-1/2 top-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
        <div className="space-y-4">
          <header className="mb-3 text-2xl font-bold">Log in</header>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="text"
              placeholder="Email or username"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="password"
              placeholder="Password"
              className="my-3 w-full border-none bg-transparent outline-none"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <a
              href="#"
              className="font-medium text-gray-400 hover:text-gray-500"
            >
              FORGOT?
            </a>
          </div>
          <button
            onClick={handleLogin}
            className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
          >
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>
          {error && <div className="w-full px-4 text-red-500">{error}</div>}
        </div>

        <div className="flex items-center space-x-4">
          <hr className="w-full border border-gray-300" />
          <div className="font-semibold text-gray-400">OR</div>
          <hr className="w-full border border-gray-300" />
        </div>

        <footer>
          <div className="grid grid-cols-2 gap-4">
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
