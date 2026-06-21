import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputProps {
  id: string;
  label: string;
  error?: string;
  containerClassName?: string;
}

/** Label + Input + inline error, wired for accessibility (aria-invalid /
 *  aria-describedby). Spread a react-hook-form `register(...)` onto it. */
export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, error, containerClassName, className, ...props }, ref) => (
    <div className={containerClassName}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn("mt-2 rounded-none", className)}
        {...props}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  ),
);
FormField.displayName = "FormField";
