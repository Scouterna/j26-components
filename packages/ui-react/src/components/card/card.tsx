import { mergeProps, useRender } from "@base-ui-components/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils.js";

const cardVariants = cva(
  `
    p-4
    border
    rounded-lg
    text-gray-dark
  `,
  {
    variants: {
      variant: {
        light: "bg-gray-100 border-gray-300",
        medium: "bg-gray-200 border-gray-300",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  },
);

export type Props = useRender.ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

function Card(props: Props) {
  const { render = <div />, className, variant, ...otherProps } = props;

  const defaultProps: useRender.ElementProps<"div"> = {
    className: cn(cardVariants({ variant }), className),
  };

  return useRender({
    render,
    props: mergeProps(defaultProps, otherProps),
  });
}

export { Card };
