import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

const LoginBtn = () => {
  const handleLogin = () => {
    signIn();
  };
  return (
    <Button size="sm" variant="secondary" onClick={handleLogin}>
      Log In
    </Button>
  );
};

export default LoginBtn;
