import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { FaEnvelope } from "react-icons/fa";

const LoginBtn = () => {
  const session = useSession();
  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() => {
        signIn();
      }}
    >
      <FaEnvelope /> Sign In
    </Button>
  );
};

export default LoginBtn;
