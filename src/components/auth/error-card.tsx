import React from "react";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "@/components/auth/card-wrapper";

const ErrorCard = () => {
  return (

    <CardWrapper headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login">
      <div className=" w-full flex justify-center items-center ">
        <ExclamationTriangleIcon className=" text-destructive w-5 h-5 " />
      </div>
    </CardWrapper>

  );
};

export default ErrorCard;
