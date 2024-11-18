"use client";

import React from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { cn } from "@/lib/utils";

import "react-phone-number-input/style.css";

interface PhoneInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  className?: string;
}

const CustomPhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="US"
        flags={flags}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

CustomPhoneInput.displayName = "CustomPhoneInput";

export { CustomPhoneInput };
