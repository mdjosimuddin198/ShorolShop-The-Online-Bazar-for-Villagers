"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import RegisterBtn from "@/app/components/actions/RegisterBtn";

const SignInPage = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };
  return (
    <div className=" flex items-center justify-center py-10 ">
      <Card className="w-md md:w-xl rounded-2xl shadow-xl">
        <CardContent className=" flex flex-col  justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Welcome Back</h3>
            <p className="text-gray-500 text-sm mb-6">
              Please login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="h-12"
            />
            <div>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="h-12"
              />
              <div className="text-right text-sm mt-1 text-blue-600 cursor-pointer hover:underline">
                Forgot Password?
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              Login
            </Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="px-2 text-gray-400 text-sm">Or Login With</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full h-12 flex items-center gap-2 rounded-xl"
            >
              <FcGoogle className="text-xl" /> Google
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 flex items-center gap-2 rounded-xl"
            >
              <FaFacebook className="text-blue-600 text-xl" /> Facebook
            </Button>
          </div>

          <p className="text-sm text-center mt-6">
            Don’t have an account? <RegisterBtn />
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
