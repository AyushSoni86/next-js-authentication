"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    profileImage: "",
  });

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/users/profile");
      const userdetails = response?.data.data;
      setUser(userdetails);
    } catch (err: any) {
      toast.error("Failed to fetch profile");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="p-6">
      <div className="absolute left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 transform">
        <div className="rounded-2xl bg-white p-6 shadow-xl ring-2 ring-gray-100 space-y-6 text-center">
          <header className="text-2xl font-bold text-gray-800">
            My Profile
          </header>

          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="mx-auto h-24 w-24 rounded-full object-cover ring-2 ring-blue-400"
            />
          ) : (
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-bold ring-2 ring-gray-300">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              {user?.username || "Unnamed User"}
            </p>
            <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
          </div>

          <button
            className="mt-4 w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
            onClick={() => toast("Edit profile coming soon!")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
