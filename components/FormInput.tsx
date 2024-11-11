import React, { forwardRef, InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { cn, Input } from "@nextui-org/react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  className?: string;
}
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      id,
      type = "text",
      defaultValue,
      placeholder,
      required = false,
      disabled = false,
      className,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-semibold text-neutral-700"
          >
            {label}
          </label>
        )}
        <Input
          id={id}
          name={id}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          disabled={pending || disabled}
          className={cn(
            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500",
            className
          )}
        />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
