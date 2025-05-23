"use client";

import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const verifyEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setIsVerified(true);
      setError(false);
      toast.success(response?.data.message || "Email verified successfully!");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Email verification failed", error);
      setError(true);
      setIsVerified(false);
      toast.error(error.response?.data?.message || "Error verifying email.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  return (
    <div className="p-6">
      <div className="absolute left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 transform text-center space-y-6">
        <header className="text-2xl font-bold text-gray-800">
          Verify your email
        </header>

        {loading && <p className="text-sm text-gray-500">Verifying...</p>}

        {!loading && isVerified && (
          <div className="space-y-4">
            <p className="text-green-600 font-medium">
              ✅ Email verified successfully!
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
            >
              Click here to Login
            </button>
          </div>
        )}

        {!loading && error && (
          <p className="text-red-500 font-medium">
            ❌ Error verifying email. Please try again later.
          </p>
        )}

        {!loading && !isVerified && !error && (
          <>
            <p className="text-gray-500 text-sm">
              We&rsquo;ve sent a verification link to your email. Please click
              the button below to verify and activate your account.
            </p>
            <button
              onClick={verifyEmail}
              className="block w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
            >
              Verify My Email
            </button>
          </>
        )}

        <div className="flex flex-col items-center space-y-4">
          <button className="text-sm text-blue-500 hover:underline">
            Didn&rsquo;t get the email? Resend
          </button>
        </div>

        <footer className="mt-12 text-xs text-gray-400">
          If you don&rsquo;t see the email, check your spam folder or try a
          different email.
        </footer>
      </div>
    </div>
  );
};

const VerifyEmail = () => (
  <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
    <VerifyEmailPage />
  </Suspense>
);

export default VerifyEmail;
