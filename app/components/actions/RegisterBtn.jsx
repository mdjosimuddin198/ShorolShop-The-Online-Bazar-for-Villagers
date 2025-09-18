"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from "react";

const RegisterBtn = () => {
  return (
    <Button variant="secondary" size="sm">
      <Link href="/register">Register</Link>
    </Button>
  );
};

export default RegisterBtn;
