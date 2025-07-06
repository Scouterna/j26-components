import { Menu as MenuPrimitive } from "@base-ui-components/react/menu";
import { ChevronRightIcon, ChevronsRightIcon } from "lucide-react";
import { createContext, useContext } from "react";
import { cn } from "../../lib/utils.js";

const Root = MenuPrimitive.Root;
const Trigger = MenuPrimitive.Trigger;
const Group = MenuPrimitive.Group;
const SubmenuRoot = MenuPrimitive.SubmenuRoot;
const SubmenuTrigger = MenuPrimitive.SubmenuTrigger;

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: This is only for display
    <svg
      aria-hidden
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      {...props}
    >
      {/* Border */}
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-gray-100"
      />

      {/* Background */}
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-gray-300"
      />

      {/* Border with same background color to create rounded edges */}
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="fill-gray-100"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <MenuPrimitive.Arrow
      className={`
        group-data-[nested]/popup:hidden
        data-[side=top]:-bottom-[8px]
        data-[side=top]:rotate-180
        data-[side=bottom]:-top-[8px]
        data-[side=bottom]:rotate-0
        data-[side=left]:-right-[13px]
        data-[side=left]:rotate-90
        data-[side=right]:-left-[13px]
        data-[side=right]:-rotate-90
      `}
    >
      <ArrowSvg />
    </MenuPrimitive.Arrow>
  );
}

const SubmenuContext = createContext<{
  isNested: boolean;
}>({
  isNested: false,
});

const Positioner = ({
  className,
  children,
  ...props
}: MenuPrimitive.Positioner.Props) => {
  const submenuContext = useContext(SubmenuContext);

  return (
    <SubmenuContext.Provider
      value={{
        isNested: true,
      }}
    >
      <MenuPrimitive.Portal>
        <MenuPrimitive.Positioner
          alignOffset={submenuContext.isNested ? -6 : 0}
          sideOffset={submenuContext.isNested ? -6 : 8}
          className={cn(
            `
            
          `,
            className,
          )}
          {...props}
        >
          <MenuPrimitive.Popup
            className={`
              group/popup
              relative z-50 py-1.5
              
              min-w-[calc(var(--anchor-width)+25px-var(--spacing)*1.5)]
              rounded-lg border bg-gray-100 text-popover-foreground shadow-md
              border-gray-300 text-gray-dark
              
              origin-[var(--transform-origin)]
              transition-[transform,scale,opacity]
              data-[ending-style]:scale-90 data-[ending-style]:opacity-0
              data-[starting-style]:scale-90 data-[starting-style]:opacity-0
            `}
          >
            <Arrow />
            {children}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </SubmenuContext.Provider>
  );
};

const GroupLabel = ({
  className,
  ...props
}: MenuPrimitive.GroupLabel.Props) => (
  <MenuPrimitive.GroupLabel
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
}: MenuPrimitive.Item.Props & {
  icon?: React.ReactNode;
}) => {
  const { icon, ...otherProps } = props;

  return (
    <MenuPrimitive.Item
      className={cn(
        `
          relative h-8 select-none items-center rounded-sm
          px-4 leading-none
  
          grid grid-cols-[1rem_auto_1rem] gap-2
  
          after:absolute
          after:inset-y-0
          after:inset-x-1.5
          after:z-[-1]
          data-[highlighted]:after:bg-blue-100
          data-[highlighted]:after:rounded-sm
  
          data-[highlighted]:text-blue
          data-[highlighted]:outline-none
  
          data-[disabled]:pointer-events-none
          data-[disabled]:opacity-50
  
          group/item
        `,
        className,
      )}
      {...otherProps}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}

      {/* This 2px padding is there to fix some issues with the font not being correctly centered. */}
      <span className="col-start-2 pb-[2px]">{children}</span>

      <ChevronRightIcon className="size-4 hidden group-aria-[haspopup]/item:block" />
    </MenuPrimitive.Item>
  );
};

const Separator = ({ className, ...props }: MenuPrimitive.Separator.Props) => (
  <MenuPrimitive.Separator
    className={cn("m-[5px] h-px bg-gray-300", className)}
    {...props}
  />
);

export {
  Group,
  GroupLabel,
  Item,
  Root,
  Trigger,
  SubmenuRoot,
  SubmenuTrigger,
  Positioner,
  Separator,
};
