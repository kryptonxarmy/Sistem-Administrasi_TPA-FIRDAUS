"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";

const Form = FormProvider;

const FormFieldContext = React.createContext({});

const FormField = ({ ...props }) => {
  return (
    <FormFieldContext.Provider value={props}>
      {props.children}
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const context = React.useContext(FormFieldContext);
  if (!context) {
    throw new Error("useFormField must be used within a FormField");
  }
  return context;
};

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const { name } = useFormField();
  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { name } = useFormField();
  return (
    <LabelPrimitive.Root ref={ref} className={cn(className)} {...props} />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { name } = useFormField();
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Slot ref={ref} {...field} {...props} />
      )}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { name } = useFormField();
  return (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(({ className, ...props }, ref) => {
  const { name } = useFormField();
  const { errors } = useFormContext();
  const error = errors[name];
  return error ? (
    <p ref={ref} className={cn("text-sm font-medium text-destructive", className)} {...props}>
      {error.message}
    </p>
  ) : null;
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};