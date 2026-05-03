import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "../../lib/cn";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, className, ...props }) => {
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
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";