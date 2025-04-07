"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Signup = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    console.log("Singup");
    try {
      const response: any = await axios.post("/api/users/signup", userDetails);
      console.log("🚀 ~ handleSignup ~ response:", response)
      router.push("/login");
      toast.success(response?.data.message);
    } catch (error: any) {
      console.log("signup failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      userDetails.username.length > 0 &&
      userDetails.email.length > 0 &&
      userDetails.password.length > 0 &&
      confirmPassword.length > 0
    ) {
      if (userDetails.password !== confirmPassword) {
        setError("Passwords do not match");
        setButtonDisabled(true);
      } else {
        setError("");
        setButtonDisabled(false);
      }
    } else {
      setButtonDisabled(true);
      setError("");
    }
  }, [userDetails, confirmPassword]);

  return (
    <div className="p-6">
      <div className="w-full absolute left-1/2 top-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
        <div className="space-y-4">
          <header className="mb-3 text-2xl font-bold">
            Create your profile
          </header>

          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="text"
              placeholder="Username"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="text"
              placeholder="Email"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="password"
              placeholder="Password"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="password"
              placeholder="Confirm Password"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <div className="w-full px-4 text-red-500">{error}</div>}
          <button
            onClick={() => handleSignup()}
            className={`w-full rounded-2xl border-b-4 border-b-blue-600   py-3 font-bold text-white  active:translate-y-[0.125rem] active:border-b-blue-400 cursor-pointer ${
              buttonDisabled ? "bg-gray-400 " : "bg-blue-500 hover:bg-blue-400"
            }`}
            disabled={buttonDisabled}
          >
            {loading ? "PROCESSING...." : "CREATE ACCOUNT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
