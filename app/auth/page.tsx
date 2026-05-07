"use client";

import { useState } from "react";

import { auth } from "@/lib/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert("Login successful!");
      } else {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert("Account created!");
      }

      router.push("/");
    } catch (error: unknown) {
      if(error instanceof Error){
        alert(error.message);
      }
  };

  const handleLogout = async () => {
    await signOut(auth);

    alert("Logged out!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Create Account"}
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleAuth}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <button
            onClick={() =>
              setIsLogin(!isLogin)
            }
            className="text-indigo-600 text-sm w-full"
          >
            {isLogin
              ? "Create new account"
              : "Already have an account?"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Logout
          </button>

        </div>
      </div>
    </main>
  );
}
