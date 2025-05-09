"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      // Validate email before submitting
      if (!email) {
        setError("Please enter your email.");
        setLoading(false);
        return;
      }

      const response = await axios.post("/api/users/forgotPassword", {
        email,
      });
      toast.success(response.data.message || "Reset link sent!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Something went wrong.");
        toast.error(
          error.response?.data?.message || "Error sending reset link."
        );
      } else {
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="absolute left-1/2 top-2/5 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-6 text-center">
        <header className="text-2xl font-bold">Forgot Password?</header>
        <p className="text-gray-500 text-sm">
          Enter your email to receive a password reset link.
        </p>
        <div className="rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input
            type="email"
            placeholder="Email"
            className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          onClick={handleSubmit}
          className={`w-full rounded-2xl border-b-4 py-3 font-bold text-white active:translate-y-[0.125rem] ${
            email.length === 0
              ? "bg-gray-400 border-b-gray-500"
              : "bg-blue-500 border-b-blue-600 hover:bg-blue-400 active:border-b-blue-400"
          }`}
          disabled={email.length === 0 || loading}
        >
          {loading ? "SENDING..." : "SEND RESET LINK"}
        </button>

        <button
          className="text-blue-500 hover:underline"
          onClick={() => router.push("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
