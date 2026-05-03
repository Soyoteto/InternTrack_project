"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Button, type ButtonProps } from "../ui/button";

export interface SubmitButtonProps extends ButtonProps {
  isPending?: boolean;
}

// A submit button that automatically disables itself and shows a loading state during form submission
export const SubmitButton = ({ children, isPending, ...props }: SubmitButtonProps) => {
  const { formState: { isSubmitting } } = useFormContext();

  const isLoading = isPending || isSubmitting;

  return (
    <Button type="submit" disabled={isLoading} {...props}>
      {isLoading ? "Loading..." : children}
    </Button>
  );
};
