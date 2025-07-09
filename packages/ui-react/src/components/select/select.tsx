import { Select as SelectPrimitive } from "@base-ui-components/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "../../lib/utils.js";

const Root = <TValue,>({
  children,
  ...props
}: SelectPrimitive.Root.Props<TValue>) => (
  <SelectPrimitive.Root {...props}>
    <Trigger>
      <SelectPrimitive.Value />
    </Trigger>
    <Positioner className="text-gray-dark">{children}</Positioner>
  </SelectPrimitive.Root>
);

const Group = SelectPrimitive.Group;

const Trigger = ({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) => (
  <SelectPrimitive.Trigger
    className={cn(
      `
        flex
        items-center
        justify-between
        h-10 w-full px-3 py-2
        rounded-lg
        border border-gray-300
        bg-gray-100 text-gray-dark
        text-base
        file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
        focus-visible:outline-none
        focus-visible:border-gray-500
        disabled:cursor-not-allowed
        disabled:opacity-50
        data-[placeholder]:text-gray-600
        data-[placeholder]:italic
        [&>span]:whitespace-nowrap
      `,
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon>
      <ChevronDownIcon className="size-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

const ScrollUpArrow = ({
  className,
  ...props
}: SelectPrimitive.ScrollUpArrow.Props) => (
  <SelectPrimitive.ScrollUpArrow
    className={cn(
      "absolute top-0 inset-x-0 flex cursor-default items-center justify-center py-1 z-10",
      className,
    )}
    {...props}
  >
    <ChevronUpIcon className="size-4" />
  </SelectPrimitive.ScrollUpArrow>
);

const ScrollDownArrow = ({
  className,
  ...props
}: SelectPrimitive.ScrollDownArrow.Props) => (
  <SelectPrimitive.ScrollDownArrow
    className={cn(
      "absolute bottom-0 inset-x-0 flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDownIcon className="size-4" />
  </SelectPrimitive.ScrollDownArrow>
);

const Positioner = ({
  className,
  children,
  ...props
}: SelectPrimitive.Positioner.Props) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Positioner
      className={cn(
        "relative z-50 min-w-[calc(var(--anchor-width)+25px-var(--spacing)*1.5)] overflow-y-auto overflow-x-hidden rounded-lg border bg-gray-100 text-popover-foreground shadow-md border-gray-300",
        className,
      )}
      {...props}
    >
      <ScrollUpArrow />
      <SelectPrimitive.Popup className={cn("p-1.5")}>
        {children}
      </SelectPrimitive.Popup>
      <ScrollDownArrow />
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>
);

const GroupLabel = ({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) => (
  <SelectPrimitive.GroupLabel
    className={cn(
      "px-[25px] text-sm leading-[25px] font-semibold select-none",
      className,
    )}
    {...props}
  />
);

const Item = ({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) => (
  <SelectPrimitive.Item
    className={cn(
      "relative flex h-7 select-none items-center rounded-sm pl-[25px] pr-[35px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-100 data-[disabled]:opacity-50 data-[highlighted]:text-blue data-[highlighted]:outline-none",
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute left-1.5 inline-flex w-4 items-center justify-center">
      <CheckIcon />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);

const Separator = ({
  className,
  ...props
}: SelectPrimitive.Separator.Props) => (
  <SelectPrimitive.Separator
    className={cn("m-[5px] h-px bg-gray-300", className)}
    {...props}
  />
);

export { Root, Group, GroupLabel, Item, Separator };
