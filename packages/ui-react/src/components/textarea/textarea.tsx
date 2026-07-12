import { Field } from "@base-ui-components/react/field";
import { cn } from "../../lib/utils.js";

export type TextareaProps = Omit<
  Field.Control.Props,
  "placeholder" | "render" | "type"
> & {
  rows?: number;
};

const Textarea = ({ className, rows = 4, ...props }: TextareaProps) => {
  return (
    <Field.Control
      render={<textarea rows={rows} />}
      className={cn(
        `
          flex
          w-full px-3 py-2
          min-h-20
          rounded-lg
          border border-gray-300
          bg-gray-100 text-gray-dark
          text-base
          resize-y
          focus-visible:outline-none
          focus-visible:border-gray-500
          disabled:cursor-not-allowed
          disabled:opacity-50
        `,
        className,
      )}
      {...props}
      // Explicitly set placeholder to empty string to prevent users from
      // ignoring the types and passing placeholder anyways.
      placeholder=""
    />
  );
};

export { Textarea };
