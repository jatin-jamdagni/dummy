 import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <div className="h-full flex justify-center items-center">

    <LoginButton>
      <Button size={"lg"}>Sign In</Button>
    </LoginButton>
    </div>
  );
};

export default Home;
