import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "../../lib/cn";

// Defines the props for FormInput, requiring a name for react-hook-form and an optional label
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

// A labeled input component that automatically connects to react-hook-form and displays errors
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, className, ...props }, ref) => {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name]?.message as string | undefined;

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label htmlFor={name} className="text-sm font-medium leading-none text-gray-700">
            {label}
          </label>
        )}
        <Input
          id={name}
          className={cn(error && "border-red-500 focus:ring-red-500", className)}
          {...register(name)}
          {...props}
        />
        {error && (
          // Displays the validation error message in red if one exists
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";