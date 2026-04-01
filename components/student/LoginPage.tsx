"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/Services/Services";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);

      if (data.role === "Student") {
        router.push("/pages/student");
      } else if (data.role === "Instructor") {
        router.push("/pages/instructor");
      } else if (data.role === "Admin") {
        router.push("/pages/admin");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="bg-green-100 flex flex-col items-center justify-center p-10 text-center">
          <Image
            src="/login_student.png"
            alt="Student studying illustration"
            width={420}
            height={420}
            className="mb-8"
          />
          <h2 className="text-3xl font-semibold text-gray-800">
            Exam Students Hub
          </h2>
          <p className="text-gray-500 mt-3 max-w-sm">
            Unleash Your Academic Success with Exam Mastery Hubs Exam Excellence
            Platform
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center p-10">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">
            Students <span className="text-green-600">Hub</span>
          </h1>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Username or email
              </label>
              <input
                type="text"
                placeholder="johnsmith007"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Forgot */}
            <div className="text-right">
              <Link href="#" className="text-sm text-green-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition"
            >
              Sign in
            </button>

            {/* Register */}
            <p className="text-sm text-center text-gray-500 mt-4">
              Are you a Supervisor?{" "}
              <Link
                href="#"
                className="text-green-600 font-medium hover:underline"
              >
                Create an Account
              </Link>
            </p>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <button
              type="button"
              className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                width={20}
                height={20}
              />
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
