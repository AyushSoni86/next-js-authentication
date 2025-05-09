"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const handleReset = async () => {
    setLoading(true);
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/users/resetPassword", {
        token,
        password: newPassword,
      });
      toast.success(response.data.message || "Password reset successful!");
      router.push("/login");
    } catch (error: any) {
      setError(error.response?.data?.error || "Something went wrong.");
      toast.error(error.response?.data?.error || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="absolute left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-6 text-center">
        <header className="text-2xl font-bold">Reset Your Password</header>
        <div className="rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input
            type="password"
            placeholder="New Password"
            className="my-3 w-full border-none bg-transparent outline-none"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input
            type="password"
            placeholder="Confirm Password"
            className="my-3 w-full border-none bg-transparent outline-none"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          onClick={handleReset}
          className={`w-full rounded-2xl border-b-4 py-3 font-bold text-white active:translate-y-[0.125rem] ${
            !newPassword || !confirmPassword
              ? "bg-gray-400 border-b-gray-500"
              : "bg-blue-500 border-b-blue-600 hover:bg-blue-400 active:border-b-blue-400"
          }`}
          disabled={!newPassword || !confirmPassword || loading}
        >
          {loading ? "UPDATING..." : "RESET PASSWORD"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
