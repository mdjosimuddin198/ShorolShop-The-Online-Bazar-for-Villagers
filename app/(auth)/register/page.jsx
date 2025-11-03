"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import LoginBtn from "@/app/components/actions/LoginBtn";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/user", formData);
      toast.success("User created successfully");

      //  login after register
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (loginRes?.error) {
        toast.error("Login failed after registration");
      } else {
        toast.success("Logged in successfully");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("User creation failed");
    }
  };

  return (
    <div className=" flex items-center justify-center  py-10">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-secondary text-center">
            WellCome To ShorolShop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Enter Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="image"
              placeholder="Enter Your Image URL"
              value={formData.image}
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="secondary" className="w-full">
              Register Now
            </Button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="px-2 text-gray-400 text-sm">Or </span>
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
            Already have an account? <LoginBtn />
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
