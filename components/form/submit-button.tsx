"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Button, type ButtonProps } from "../ui/button";

// A submit button that automatically disables itself and shows a loading state during form submission
export const SubmitButton = ({ children, ...props }: ButtonProps) => {
  const { formState: { isSubmitting } } = useFormContext();

  return (
    <Button type="submit" disabled={isSubmitting} {...props}>
      {isSubmitting ? "Loading..." : children}
    </Button>
  );
};